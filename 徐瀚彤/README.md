个人信息
===
姓名：徐瀚彤

学号：21821089

主题：复杂网络（Complex Networks）

论文选择
===

[node2vec: Scalable Feature Learning for Networks](https://cs.stanford.edu/people/jure/pubs/node2vec-kdd16.pdf)

摘要：

网络中节点和边缘上的预测任务需要在学习算法所使用的工程特性方面进行仔细的研究。近年来，表征学习领域的研究取得了重大进展，通过学习特征本身实现了预测的
自动化。然而，目前的特征学习方法不足以表达网络中观察到的连接模式的多样性。在此，我们提出node2vec，一个学习网络节点连续特征表示的算法框架。
在node2vec中，我们学习了一种将节点映射到低维特征空间的方法，这种方法可以最大限度地保留节点的网络邻域。我们定义了一个灵活的节点网络邻域的概念，
并设计了一个有偏随机游走过程，有效地探索了不同的邻域。我们的算法推广了之前的工作，这些工作基于严格的网络邻域概念，我们认为在探索邻域时增加的灵活性
是学习更丰富表示的关键。

我们证明了node2vec在多个不同领域的真实网络中的多标签分类和链接预测方面优于现有的先进技术。
综上所述，我们的工作代表了一种在复杂网络中有效学习最先进的独立于任务的表示的新方法。

原理介绍：

node2vec的指导性思想在于：
1.属于同一社区的节点在低维空间距离相近（同质性假设）
2.结构上相似的节点具有相似的嵌入表示（结构等价性假设）

设 f(u) 是将顶点 u 映射为embedding向量的映射函数,对于图中每个顶点u，定义 N_S(u) 为通过采样策略 S 采样出的顶点 u 的近邻顶点集合。
node2vec优化的目标是把该节点表示为向量的情况下出现该节点邻近的点的概率最大。目标函数如下：

![image](https://www.zhihu.com/equation?tex=max_f+%7B%5Csum_%7Bu%5Cin+V%7D%5Clog%7BPr%28N_S%28U%29%7Cf%28u%29%29%7D%7D)

为了使优化问题易于处理，文章做了两个标准假设：
1.条件独立，即采样每个邻居是相互独立的，所以如果要计算采样所有邻居的概率只需要将采样每个邻居的概率相乘就行了，公式化表达就是：

![image](https://www.zhihu.com/equation?tex=Pr%28N_s%28u%29%7Cf%28u%29%29%3D%5Cprod_%7Bn_i%5Cin+N_s%28u%29%7D+Pr%28n_i%7Cf%28u%29%29)

2.特征空间的对称性。在特征空间中，源节点和邻域节点具有对称效应。用一个模型来表示一个（节点，邻居）对:

![image](https://www.zhihu.com/equation?tex=Pr%28n_i%7Cf%28u%29%29%3D%5Cfrac%7B%5Cexp%7Bf%28n_i%29%5Ccdot+f%28u%29%7D%7D%7B%5Csum_%7Bv%5Cin+V%7D%7B%5Cexp%7Bf%28v%29%5Ccdot+f%28u%29%7D%7D%7D)

根据以上两个假设，目标函数简化为：
![image](https://www.zhihu.com/equation?tex=max_f%7B%5Csum_%7Bu%5Cin+V%7D%5B-%5Clog%7BZ_u%7D%2B%5Csum_%7Bn_i%5Cin+N_s%28u%29%7D%7Bf%28n_i%29%5Ccdot+f%28u%29%7D%5D%7D)

其中![image](https://www.zhihu.com/equation?tex=Z_u%3D%5Csum_%7Bn_i%5Cin+N_s%28u%29%7D%7B%5Cexp%28f%28n_i%29%5Ccdot+f%28u%29%29%7D),计算成本高,使用用负抽样来近似它。


基于同质性假设和结构等价性假设，本文设计了一种2阶随机游走来进行采样。
给定当前顶点 v ，访问下一个顶点 x 的概率为：

![image](https://upload-images.jianshu.io/upload_images/1500965-f855e472c241e8a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/814/format/webp)

![image](https://math.jianshu.com/math?formula=%5Cpi_%7Bvx%7D) 是顶点 v 和顶点 x 之间的未归一化转移概率， Z 是归一化常数。

![image](https://www.zhihu.com/equation?tex=%5Cpi_%7Bvx%7D%3D%5Calpha_%7Bpq%7D%28t%2Cx%29%5Ccdot+w_%7Bvx%7D)
![image](https://www.zhihu.com/equation?tex=w_%7Bvx%7D)是两个节点之间的权重。
![image](https://upload-images.jianshu.io/upload_images/1500965-723cc93f5d9ea8f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/558/format/webp)

dtx 表示节点t和x间最短距离，只能属于{0,1,2}。参数p和q相当于调节BFS和DFS的程度。
p称为Return parameter，决定再访问节点的可能性。若p值调高(>max(q,1))，可以保证在两步内采样已访问过的节点的可能性比较低；若p值调低(<min(q,1))，会使得游走变得比较拘于局部。
q称为In-out parameter，q>1游走会选择离t近的节点，以此达到接近BFS的效果；q<1游走会选择离t更远的节点，达到类似DFS的效果。

论文提供的算法
![image](https://img-blog.csdnimg.cn/20190212152247634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxNTEyODM=,size_16,color_FFFFFF,t_70)

1.根据p、q和之前的公式计算一个节点到它的邻居的转移概率。

2.将这个转移概率加到图G中形成G'。

3.walks用来存储随机游走，先初始化为空。

4.外循环r次表示每个节点作为初始节点要生成r个随机游走。

5.然后对图中每个节点。

6.生成一条随机游走walk。

7.将walk添加到walks中保存。

8.然后用SGD的方法对walks进行训练。

第6步中一条walk的生成方式如下：


1.将初始节点u添加进去。

2.walk的长度为l，因此还要再循环添加l-1个节点。

3.当前节点设为walk最后添加的节点。

4.找出当前节点的所有邻居节点。

5.根据转移概率采样选择某个邻居s。

6.将该邻居添加到walk中。

