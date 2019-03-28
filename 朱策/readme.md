个人信息
=
姓名：朱策<br>
学号：21821152<br>
主题：复杂网络（Complex Networks）<br>
邮箱：zhuce96@zju.edu.cn<br>

论文选择
=
Higher-order organization of complex networks<br>

摘要
-
Networks are a fundamental tool for understanding and modeling complex systems in physics, biology, neuroscience, engineering, and social science. Many networks are known to exhibit rich, lower-order connectivity patterns that can be captured at the level of individual nodes and edges. However, higher-order organization of complex networks—at the level of small network subgraphs—remains largely unknown. Here, we develop a generalized framework for clustering networks on the basis of higher-order connectivity patterns. This framework provides mathematical guarantees on the optimality of obtained clusters and scales to networks with billions of edges. The framework reveals higher-order organization in a number of networks, including information propagation units in neuronal networks and hub structure in transportation networks. Results show that networks exhibit rich higher-order organizational structures that are exposed by clustering based on higher-order connectivity patterns.

- 前言：

      最近阅读了Benson等人发表在science上的论文《Higher-order organization of complex networks》，在该论文中作者提出了一种通用的框架，可在网络中基于高阶连接模式进行聚类。 和以往接触的聚类方法（K-means， 层次聚类， DBSCAN， 或者OPRICS）等不同的是： K-means等在对item进行聚类的时候，使用的是item的特征， 并且item之间是没有连边的。 比如，对于二维平面上的点进行聚类， 那么对于每一个点来说有两个特征（即x和y），或者在MovieLen数据集上对用户进行聚类， 那么每个用户的特征就是看过的电影。而在该论文中提出的高阶聚类框架是针对连通的网络（甚至要在运行算法之前做预处理，去除掉网络中的孤立的点）。

- 1 . 网络是理解和调控复杂系统的基本工具。为了挖掘网络化数据连接模式，揭示出功能组织，仅考虑简单描述符号是不够的，比如每个实体(即节点)和其他实体的相互作用数量（节点度），因为在这种简单描述符号层面，两个网络可能等同，但它们的连接结构非常不同。本文提出了一种通用的框架，基于高阶连接模式对网络进行聚类。这个高阶连接模式包含了出现在数据中的所有交互作用，通过该框架鉴别出富含某个特定高阶模式实例的网络区域。如果这种高阶连接模式是预先指定的，那么这种方法就能发现通过这个模式互连的节点， 作者等人通过该方法将线虫神经元网络中的20个神经元成功地组织在一起。 

- 2 . 最常见的高阶结构是小网络子图，称为模体，网络模体被认为构建了复杂网络中的块。需要说明的是：不同的网络模体揭示不同的高阶聚类，也就是说，基于不同的模体，可以发现不同的组织模式。下图给出了所有的三节点的有方向的模体：（13种）

![img1](https://img-blog.csdn.net/20160920160734997)
![img2](https://img-blog.csdn.net/20160920160807325)
![img3](https://img-blog.csdn.net/20160920160822872)
