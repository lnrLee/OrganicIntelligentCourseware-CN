# -*- coding: utf-8 -*-
"""
Created on Thu May 02 14:07:14 2019

@author: Administrator
"""

import networkx as nx
import matplotlib.pyplot as plt

# regular graphy
# generate a regular graph which has 20 nodes & each node has 3 neghbour nodes.
#RG = nx.random_graphs.random_regular_graph(4, 20)
# the spectral layout
#pos = nx.spectral_layout(RG)
# draw the regular graphy
#nx.draw(RG, pos, with_labels = False, node_size = 30)
#plt.show()

# erdos renyi graph
# generate a graph which has n=20 nodes, probablity p = 0.2.
#ER = nx.random_graphs.erdos_renyi_graph(20, 0.4)
# the shell layout
#pos = nx.shell_layout(ER)
#nx.draw(ER, pos, with_labels = False, node_size = 30)
#plt.show()

# WS network
# generate a WS network which has 20 nodes,
# each node has 4 neighbour nodes,
# random reconnection probability was 0.3.
#WS = nx.random_graphs.watts_strogatz_graph(20, 4, 0.4)
# circular layout
#pos = nx.circular_layout(WS)
#nx.draw(WS, pos, with_labels = False, node_size = 30)
#plt.show()

# BA scale-free degree network
# generalize BA network which has 20 nodes, m = 1
BA = nx.random_graphs.barabasi_albert_graph(20, 2)
# spring layout
pos = nx.spring_layout(BA)
nx.draw(BA, pos, with_labels = False, node_size = 30)
plt.show()