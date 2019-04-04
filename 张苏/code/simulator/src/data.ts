// TODO: calculate total net info
export interface TotalNetInfo {
  avgDist: number;

}

export interface Message {
  // from the closest node to farthest node
  path: NetNode[];
  ttl: number;
}

export interface FreqNode {
  node: NetNode;
  frequency: number;
  neighborSet: Set<NetNode>;
}

export interface NetInfo {
  avgDist: number;
  degreeDist: Map<NetNode, Set<NetNode>>;
  freqNodeMap: Map<NetNode, FreqNode>;
  // TODO: IB is only used by op algo, but for most time it's the same as handledMessages
  IB: Message[];
}

export interface NetNode {
  id: number;
  x: number;
  y: number;
  neighborsMap: Map<NetNode, NetLink>;
  isSink: boolean;
  receivedMessage: boolean;
  unhandledMessages: Message[];
  handledMessages: Message[];
  nextUnhandledMessages: Message[];
  netInfo?: NetInfo;
}

export interface NetLink {
  source: NetNode;
  target: NetNode;
  distance: number;
}

export interface RunningInfo {
  sourceNode: NetNode;
  sinkNodes: NetNode[];
  cost: number;
  totalMessage: number;
  usedMessage: number;
  coveredNodes: Set<NetNode>;
}

export const cloneMessage = (message: Message): Message => {
  return {
    path: [...message.path],
    ttl: message.ttl
  }
};

const randomIntWithPadding = (range: number,
                              padding: number = 10): number => {
  return Math.round(Math.random() * (range - padding * 2) + padding);
};

const generateRandomNode = (id: number,
                            fieldWidth: number,
                            fieldHeight: number): NetNode => {
  return {
    id,
    x: randomIntWithPadding(fieldWidth),
    y: randomIntWithPadding(fieldHeight),
    neighborsMap: new Map<NetNode, NetLink>(),
    isSink: false,
    receivedMessage: false,
    handledMessages: [],
    unhandledMessages: [],
    nextUnhandledMessages: []
  }
};

export const generateRandomNodes = (count: number,
                                    fieldWidth: number,
                                    fieldHeight: number): NetNode[] => {
  const netNodes: NetNode[] = [];
  for (let i = 0; i < count; i++) {
    netNodes.push(generateRandomNode(i, fieldWidth, fieldHeight));
  }
  return netNodes;
};

// TODO: choose better ttl
export const generateMessage = (): Message => {
  return {
    ttl: 15,
    path: []
  };
};

const calcDistance = (nodeA: NetNode, nodeB: NetNode): number => {
  return Math.sqrt((nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2);
};

const getCost = (netNode: NetNode, message: Message): number => {
  const lastNode = message ? message.path[0] : null;
  return lastNode ? lastNode.neighborsMap.get(netNode).distance : 0;
};

// TODO: paper use the path length instead of distance
export const getCostFromHandledMessage = (nodeWithMessage: NetNode): number => {
  // let cost = 0;
  // for (const message of nodeWithMessage.unhandledMessages) {
  //   cost += getCost(nodeWithMessage, message);
  // }
  // return cost;
  return nodeWithMessage.unhandledMessages.length;
};

export const generateLinksFromNodes = (netNodes: NetNode[],
                                       connectDistance: number): NetLink[] => {
  const netLinks: NetLink[] = [];
  // TODO: use grids to accelerate the calculation
  for (let netNodeA of netNodes) {
    for (let netNodeB of netNodes) {
      if (netNodeA === netNodeB) {
        continue;
      } else {
        const dist = calcDistance(netNodeA, netNodeB);
        if (!netNodeB.neighborsMap.has(netNodeA) &&
          dist <= connectDistance) {
          const netLink: NetLink = {
            source: netNodeA,
            target: netNodeB,
            distance: dist
          };
          netLinks.push(netLink);
          netNodeA.neighborsMap.set(netNodeB, netLink);
          netNodeB.neighborsMap.set(netNodeA, netLink);
        }
      }
    }
  }
  return netLinks;
};

const findTopFreqNode = (netNode: NetNode,
                         excludes: Set<FreqNode>): FreqNode => {
  const freqNodeMap = netNode.netInfo.freqNodeMap;
  let mostFreqNode = null;
  let mostFreq = 0;
  for (const freqNode of freqNodeMap.values()) {
    if (excludes.has(freqNode)) {
      continue;
    }
    if (freqNode.frequency > mostFreq) {
      mostFreqNode = freqNode;
      mostFreq = freqNode.frequency;
    }
  }
  return mostFreqNode;
};

export const findTopMFreqNode = (netNode: NetNode, m: number): Set<FreqNode> => {
  if (netNode.netInfo.freqNodeMap.size <= m) {
    return new Set<FreqNode>(netNode.netInfo.freqNodeMap.values());
  }
  const freqNodeSet = new Set<FreqNode>();
  for (let i = 0; i < m; i++) {
    freqNodeSet.add(findTopFreqNode(netNode, freqNodeSet));
  }
  return freqNodeSet;
};

export const lottery = (possibility: number): boolean => {
  return Math.random() <= possibility;
};

export const calcTotalNetInfo = (netNodes: NetNode[]) => {

};
