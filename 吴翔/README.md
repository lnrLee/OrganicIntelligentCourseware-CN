# 个人信息
- 姓名：吴翔
- 学号：21821151
- 主题：复杂网络（Complex Networks）
- 邮箱：21821151@zju.edu.cn

# 论文选择

[Finding and evaluating community structure in networks](https://arxiv.org/pdf/cond-mat/0308217.pdf)

*作者：Newman,Girvan*

*2004 Physical review*

作者的另一篇相似文献：[Community structure in social and biological networks](https://www.pnas.org/content/pnas/99/12/7821.full.pdf)

- 摘要

We propose and study a set of algorithms for discovering community structure in networks——natural divisions of network nodes into densely connected subgroups. Our algorithms all share two definitive features: first, they involve iterative removal of edges from the network to split it into communities, the edges removed being identified using one of a number of possible “betweenness” measures, and second, these measures are, crucially, recalculated after each removal. We also propose a measure for the strength of the community structure found by our algorithms, which gives us an objective metric for choosing the number of communities into which a network should be divided. We demonstrate that our algorithms are highly effective at discovering community structure in both computer-generated and real-world network data, and show how they can be used to shed light on the sometimes dauntingly complex structure of networked systems.

本文提出和研究一组用于发现网络社区结构的算法，即将网络节点自然划分为密集连接的子群。本算法具有两种确定的特征：第一，它们涉及迭代地删除网络中的边，分割成各个社区，使用多种可能的"betweenness"度量找出要删除的边。第二，这些关键的度量在每次删除操作后重新计算。本文也提出了一个衡量算法发现的社区结构强度
的方法，用于选择网络应该被划分的社区数目。本文证明了算法在计算机生成的和现实世界的网络数据上的有效性，展示了它们如何被用来揭示网络系统难以处理的复杂结构。

- 正文

本文解决的问题是社区发现(community detection)，介绍的是一种基于层次聚类进行社交网络分析的方法（GN算法，由Newman和Girvan提出）。模型是传统的图网络模型，图中的节点代表实体，边代表实体之间的联系。一般的社区应该具有的特征为社区内部联系紧密，反映到图中是一个边稠密图，社区之间联系松散，如果把一个社区当做一个节点的话，重新形成的图是边稀疏图。

社区发现的算法大致可分为两种基本思想：

1.agglomerative methods，凝聚算法，这类方法从一个个孤立的节点开始，计算每两个节点的相似度，相似度高则这两个节点在同一个社团。这种方法的问题在于：社区中的核心节点往往具有很高的相似度，但是边缘节点则容易被忽略。

2.divisive methods，分裂算法，我们从感兴趣的网络开始，并尝试找到最不相似的连接顶点对，然后去除它们之间的边。通过反复这样做，我们将网络划分为越来越小的组件。我们可以在任何阶段停止该过程，并将该阶段的结果作为网络社区。整个过程可以表示为树形图，描绘了网络连续分裂成越来越小的组。

本文是基于分裂思想的算法，算法整体步骤如下：

   （1）计算网络中所有边的betweenness 
   
   （2）移除betweenness最大的边
   
   （3）重新计算所有边的betweenness
   
   （4）重复步骤2-3直到没有边剩余

"betweenness"解释为连接社团之间（而不是社团内部）节点的度量，有人翻译为"介数"。betweenness的计算方法有：

1. shortest-path betweenness  (最短路经过次数最多的边）

2. random-walk betweenness （随机游走）

3. current-flow betweenness (电流模型)

![电阻电流模型](./1.png)

划分结果质量的评估：模块度（modularity）

用来衡量一个社区划分好坏的标准。一个相对好的结果在社区内部的节点相似度较高，而在社区外部节点的相似度较低。

设e<sub>ij</sub>表示社区i和社区j内部边数目的和与总边数的比例，a<sub>i</sub>表示社区i内部的点所关联的所有的边的数目与总边数的比例。

![数学公式](./2.png)

- Examples

社交网络分析的经典研究：Wayne Zachary观察了美国大学空手道俱乐部成员之间的社交互动。他根据俱乐部内外的社交互动建立了俱乐部成员之间的联系网络。 偶然的机会，在俱乐部管理员和主要空手道教师之间就是否提高俱乐部费用进行研究期间出现了争议，因此俱乐部最终分成两部分，形成了两个较小的俱乐部，围绕着管理员和老师。

![Zachary karate club](./3.png)

《悲惨世界》人物网络

![Les Miserables](./4.png)

本算法的时间复杂度为O(m<sup>2</sup>n)，m是边数量，n是结点数量，其中计算"介数"的复杂度为O(mn).

GN算法是社区发现中的第一个算法，其准确度较高，能揭示复杂网络的层次结构。但是，它的时间复杂度太高，而且对于不好的划分，无法回溯地进行修正。

