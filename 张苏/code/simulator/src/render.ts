import * as d3 from 'd3';
import { NetLink, NetNode } from './data';

export const initRender = (netNodes: NetNode[], netLinks: NetLink[]) => {
  const svg = d3.select('#container').select('svg');

  const svgLinks = svg.selectAll('path')
    .data(netLinks)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (data: NetLink) => {
      return 'M' + data.source.x + ' ' + data.source.y +
        'L' + data.target.x + ' ' + data.target.y;
    })
    .style('stroke', 'grey')
    .style('storke-width', '1px');

  const svgNodes = svg.selectAll('circle')
    .data(netNodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', 5)
    .attr('ref-id', (data: NetNode) => data.id)
    .attr('cx', (data: NetNode) => (data.x))
    .attr('cy', (data: NetNode) => (data.y))
    .attr('fill', 'black');
};

export const rerenderNode = (netNode: NetNode) => {
  d3.select(`circle[ref-id="${netNode.id}"]`)
    .attr('fill', (data: NetNode) => {
      if (data.receivedMessage) { return '#20c997'; }
      if (data.isSink) { return 'red'; }
      return 'black';
    });
};

export const rerenderNodes = (netNodes: NetNode[]) => {
  for (let netNode of netNodes) {
    rerenderNode(netNode);
  }
};
