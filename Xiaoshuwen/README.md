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

#### 方法证明推导：

大部分的二分图网络的聚类系数都是测量四边形的浓度。这和普通的聚类系数有区别，因为普通的聚类系数是在单模图上计算的，因此三角形是它的最小圈。而二分图网络的最小圈是四个节点组成的。二分图的四节点循环圈是指二分图两个集合中各有两个点，他们之间存在链接，因此有四条路径。其聚类系数定义是闭合四节点圈在四节点圈中的占比。对于节点i的聚类系数定义是以节点i为中心的四节点路径中闭合的路径的占比。如图一所示，分别是一个六节点圈和四节点的星型路径，分别都是闭合的。

对于一个六节点圈而言，如果加入了额外路径，那么则会有更多的形态，如图2所示。

为了能够更好地区分这些形态，作者引入了崭新的聚类系数的计算方法。



#### 实验结果：
