import * as Data from './data';
import { NetNode, NetLink, RunningInfo, FreqNode, NetInfo, Message } from './data';
import { rerenderNode, rerenderNodes } from './render';

const Alpha = 0.5;
const Beta  = 0.3;
const Gamma = 0.2;

// interface DecisionResult {
//   nextNodes: NetNode[];
// }

export const chooseNode = (netNodes: NetNode[]): NetNode => {
  while (true) {
    const randomIndex = Math.floor(Math.random() * netNodes.length);
    if (netNodes[randomIndex].neighborsMap.size !== 0) {
      return netNodes[randomIndex];
    }
  }
};

export const chooseNodes = (netNodes: NetNode[], count: number) => {
  const chosenNodes: NetNode[] = [];
  const netIdSet = new Set<number>();
  let randomItemCount = 0;
  while (randomItemCount < count) {
    const node = chooseNode(netNodes);
    if (!netIdSet.has(node.id)) {
      chosenNodes.push(node);
      netIdSet.add(node.id);
      randomItemCount++;
    }
  }
  return chosenNodes;
};

const prepareNodes = (netNodes: NetNode[], runningInfo: RunningInfo): void => {
  const sinkNodes = chooseNodes(netNodes, Math.floor(netNodes.length * 0.1) + 1);
  const sourceNode = sinkNodes.pop();
  sourceNode.receivedMessage = true;
  sourceNode.unhandledMessages.push(Data.generateMessage());
  rerenderNode(sourceNode);
  for (let node of sinkNodes) {
    node.isSink = true;
  }
  rerenderNodes(sinkNodes);
  runningInfo.sourceNode = sourceNode;
  runningInfo.sinkNodes = sinkNodes;
};

export const generateRunningInfo = (netNodes: NetNode[]): RunningInfo => {
  const runningInfo: RunningInfo = {
    sourceNode: null,
    sinkNodes: null,
    cost: 0,
    totalMessage: 0,
    usedMessage: 0,
    coveredNodes: new Set<NetNode>()
  };
  prepareNodes(netNodes, runningInfo);
  return runningInfo;
};

export const initNetInfo = async (netNodes: NetNode[],
                                  runningInfo: RunningInfo,
                                  intervalTIme: number = 100) => {
  for (let node of netNodes) {
    node.netInfo = {
      avgDist: 0,
      degreeDist: new Map<NetNode, Set<NetNode>>(),
      freqNodeMap: new Map<NetNode, FreqNode>(),
      IB: []
    }
  }
  const initMessage = runningInfo.sourceNode.unhandledMessages[0];
  runningInfo.sourceNode.receivedMessage = false;
  runningInfo.sourceNode.unhandledMessages.pop();
  rerenderNode(runningInfo.sourceNode);
  for (const sinkNode of runningInfo.sinkNodes) {
    sinkNode.receivedMessage = true;
    sinkNode.unhandledMessages.push(Data.generateMessage());
    await actPreSend([sinkNode], intervalTIme);
    clearMessage(netNodes);
  }
  runningInfo.sourceNode.receivedMessage = true;
  runningInfo.sourceNode.unhandledMessages.push(initMessage);
  rerenderNode(runningInfo.sourceNode);
};

const updateNetInfo = (netNode: NetNode, message: Message): void => {
  const IB = netNode.netInfo.IB, netInfo = netNode.netInfo;
  netInfo.avgDist = (IB.length * netInfo.avgDist + message.path.length) / (IB.length + 1);
  const lastNode = message.path[0], last2Node = message.path[1];
  if (lastNode && last2Node) {
    if (!netInfo.degreeDist.get(lastNode)) {
      netInfo.degreeDist.set(lastNode, new Set<NetNode>().add(last2Node));
    } else {
      netInfo.degreeDist.set(lastNode, netInfo.degreeDist.get(lastNode).add(last2Node));
    }
  }
  for (let i = 0; i < message.path.length; i++) {
    const pathNode = message.path[i];
    if (!netInfo.freqNodeMap.get(pathNode)) {
      netInfo.freqNodeMap.set(pathNode, {
        node: pathNode,
        frequency: 1,
        neighborSet: new Set<NetNode>()
      })
    } else {
      netInfo.freqNodeMap.get(pathNode).frequency++;
    }
    if (message.path[i - 1]) {
      netInfo.freqNodeMap.get(pathNode).neighborSet.add(message.path[i - 1]);
    }
    if (message.path[i + 1]) {
      netInfo.freqNodeMap.get(pathNode).neighborSet.add(message.path[i + 1]);
    }
  }
  netInfo.IB.push(message);
};

const broadcast = (netNode: NetNode): NetNode[] => {
  const nextNodes: NetNode[] = [];
  if (netNode.handledMessages.length !== 0) {
    return nextNodes;
  }
  // TODO: find the closest message
  const message = netNode.unhandledMessages[0];

  // const fromNode = message.path[0];
  for (const toNode of netNode.neighborsMap.keys()) {
    // if (toNode === fromNode) { continue; }
    const nextMessage = Data.cloneMessage(message);
    nextMessage.path.unshift(netNode);
    toNode.nextUnhandledMessages.push(nextMessage);
    nextNodes.push(toNode);
  }
  return nextNodes;
};

const decideByFlood = (netNode: NetNode): boolean => {
  const message = netNode.unhandledMessages[0];
  return --message.ttl !== 0;
};

const decideByOpFlood = (netNode: NetNode): boolean => {
  const message = netNode.unhandledMessages[0];
  const messagePathSet = new Set<NetNode>(message.path);
  const netInfo = netNode.netInfo;

  let threshold = netInfo.avgDist * 2;
  let degree = 0;
  let fullDegree = 0;
  for (const neighbor of netNode.neighborsMap.keys()) {
    if (!messagePathSet.has(neighbor)) {
      degree += netInfo.degreeDist.get(neighbor).size;
    }
    fullDegree += netInfo.degreeDist.get(neighbor).size;
  }
  // TODO: how to set m?
  const accessList = Data.findTopMFreqNode(netNode, 3);
  for (const freqNode of accessList) {
    if (messagePathSet.has(freqNode.node)) {
      accessList.delete(freqNode);
    }
    for (const accessNgb of freqNode.neighborSet) {
      if (messagePathSet.has(accessNgb)) {
        accessList.delete(freqNode);
      }
    }
  }
  let degree2 = 0;
  let unvisitedNgb = new Set<NetNode>(netNode.neighborsMap.keys());
  for (const freqNode of accessList) {
    for (const accessNgb of freqNode.neighborSet) {
      unvisitedNgb.delete(accessNgb);
    }
  }
  let tempNgb = new Set<NetNode>(netNode.neighborsMap.keys());
  for (const ngb of unvisitedNgb) {
    tempNgb.delete(ngb);
  }
  unvisitedNgb = tempNgb;
  for (const node of unvisitedNgb) {
    degree2 += netInfo.degreeDist.get(node).size;
  }
  const pr = Alpha * (1 - messagePathSet.size / threshold) +
    Beta * (degree / fullDegree) +
    Gamma * (degree2 / fullDegree);
  console.log(pr);
  return Data.lottery(pr);
};

export const actSend = async (activeNodes: NetNode[],
                              algorithm: 'flood' | 'opFlood',
                              runningInfo: RunningInfo = null,
                              needUpdate: boolean = false,
                              intervalTime: number = 1000) => {
  if (activeNodes.length === 0) {
    return;
  }
  rerenderNodes(activeNodes);
  let nextNodeSet: Set<NetNode> = new Set<NetNode>();
  for (let node of activeNodes) {
    // TODO: calc only receive cost
    if (runningInfo) {
      runningInfo.cost += Data.getCostFromHandledMessage(node);
      runningInfo.totalMessage += node.unhandledMessages.length;
      if (node.isSink) {
        runningInfo.coveredNodes.add(node);
        runningInfo.usedMessage += node.unhandledMessages.length;
      }
    }

    if (needUpdate) {
      for (const message of node.unhandledMessages) {
        updateNetInfo(node, message);
      }
    }
    let decision;
    switch (algorithm) {
      case 'flood':
        decision = decideByFlood(node);
        break;
      case 'opFlood':
        decision = decideByOpFlood(node);
        break;
    }
    if (decision) {
      const nextNodes = broadcast(node);
      for (const nextNode of nextNodes) {
        nextNodeSet.add(nextNode);
      }
    }
    node.handledMessages.push(...node.unhandledMessages);
    node.unhandledMessages = [];
  }
  for (let node of activeNodes) {
    if (!nextNodeSet.has(node)) {
      node.receivedMessage = false;
    }
  }
  for (let node of nextNodeSet) {
    node.unhandledMessages = node.nextUnhandledMessages;
    node.nextUnhandledMessages = [];
    node.receivedMessage = true;
  }

  await new Promise(resolve => {
    setTimeout(async () => {
      rerenderNodes(activeNodes);
      await actSend(Array.from(nextNodeSet), algorithm, runningInfo, needUpdate, intervalTime);
      resolve();
    }, intervalTime);
  });
};

const actPreSend = async (activeNodes: NetNode[], intervalTime: number) => {
  await actSend(activeNodes, 'flood', null, true, intervalTime);
};

const clearMessage = (netNodes: NetNode[]): void => {
  for (const node of netNodes) {
    node.receivedMessage = false;
    node.handledMessages = [];
    node.unhandledMessages = [];
    node.nextUnhandledMessages = [];
  }
};

export const restoreRunningInfo = (netNodes: NetNode[], runningInfo: RunningInfo) => {
  runningInfo.coveredNodes.clear();
  runningInfo.totalMessage = 0;
  runningInfo.usedMessage = 0;
  runningInfo.cost = 0;
  const sourceNode = runningInfo.sourceNode;
  clearMessage(netNodes);
  sourceNode.receivedMessage = true;
  // TODO: because the ttl might be 0, new message needs to be generated
  sourceNode.unhandledMessages.push(Data.generateMessage());
};
