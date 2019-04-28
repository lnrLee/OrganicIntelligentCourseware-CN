### 个人信息：

姓名：肖舒文

学号：21721140

主题：复杂网络


### 论文选择：

[Identifying Influential Nodes in Bipartite Networks Using the Clustering Coeffcient](https://arxiv.org/pdf/1406.5814.pdf)

#### 摘要：

The identification of influential nodes in complex network can be very challenging. If the network has a community structure, centrality measures may fail to identify the complete set of influential nodes, as the hubs and other central nodes of the network may lie inside only one community. Here we define a bipartite clustering coefficient that, by taking diﬀerently structured clusters into account, can find important nodes across communities.

### 论文解读：

#### 中心思想：

在网络中定位重要节点通常是至关重要的。然而目前许多中心性的措施无法很好地解决这个问题，特别是当网络是社区结构的时候。原因在于这些方法往往只会找出同一个社区内重要节点。因此文章提出了一种新的方法，基于新定义的聚类系数来确定跨社区的重要节点。文章主要聚焦在现实世界中比较常见的二分图结构的网络，这种网络的定义是可以把网络中的节点分成两个集合，其中节点的链接只存在于两个非同一集合的节点之间。如现实中的协作网络，作者部分通常只和论文部分有链接。在文章中，作者在二分图网络中进行计算，分析确定一个聚类系数，从而识别出驱动网络集群行为的重要节点。

#### 模型结构：

#### 实验结果：
