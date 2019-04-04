import {
  NetLink, NetNode, RunningInfo,
  generateRandomNodes, generateLinksFromNodes
} from './data';
import * as Sim from './sim';
import * as Render from './render';

const netNodes = generateRandomNodes(500, 600, 600);
const netLinks = generateLinksFromNodes(netNodes, 45);

let runningInfo: RunningInfo = null;

const prepareBtn = document.getElementById('prepare');
const floodActBtn = document.getElementById('flood');
const opFloodActBtn = document.getElementById('opFlood');

const consoleDiv = document.getElementById('console');

const printToConsole = (msg: string) => {
  const p = document.createElement('p');
  p.innerText = msg;
  consoleDiv.appendChild(p);
};

const printRunningInfo = (info: RunningInfo) => {
  const utility = ((info.usedMessage / info.totalMessage) * 100).toFixed(2);
  const coverage = ((info.coveredNodes.size / info.sinkNodes.length) * 100).toFixed(2);
  const msg = `Total cost: ${info.cost}   Utility: ${utility}%   Coverage: ${coverage}%.`;
  printToConsole(msg);
};

const disableActBtns = () => {
  (<any>floodActBtn).disabled = true;
  (<any>opFloodActBtn).disabled = true;
};

const enableActBtns = () => {
  (<any>floodActBtn).disabled = false;
  (<any>opFloodActBtn).disabled = false;
};

const handleActEvent = async (algorithm: 'flood' | 'opFlood') => {
  printToConsole(`Begin to act ${algorithm} algorithm.`);
  Sim.restoreRunningInfo(netNodes, runningInfo);
  disableActBtns();
  await Sim.actSend([runningInfo.sourceNode], algorithm, runningInfo, false);
  printToConsole('Finish acting.');
  printRunningInfo(runningInfo);
  enableActBtns();
};

prepareBtn.onclick = async (e) => {
  printToConsole('Begin to initialize the complex network info.');
  runningInfo = Sim.generateRunningInfo(netNodes);
  (<any>prepareBtn).disabled = true;
  disableActBtns();
  await Sim.initNetInfo(netNodes, runningInfo, 50);
  console.log(netNodes);
  printToConsole('Finish preparing.');
  printToConsole('Finish selecting source node and sink nodes');
  enableActBtns();
};

floodActBtn.onclick = async (e) => {
  await handleActEvent('flood');
  console.log(runningInfo);
};

opFloodActBtn.onclick = async (e) => {
  await handleActEvent('opFlood');
  console.log(runningInfo);
};

Render.initRender(netNodes, netLinks);
disableActBtns();
