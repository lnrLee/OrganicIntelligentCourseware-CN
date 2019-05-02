# 个人信息
- 姓名：吴昊潜
- 学号：21821115
- 主题：复杂网络（Complex Networks）
- 邮箱：woolsey@zju.edu.cn

# 论文选择

[Acomplex network-based approach for boundary shape analysis](https://www.sciencedirect.com/science/article/pii/S0031320308002793)

Published in: Pattern Recognition, Volume 42, Issue 1, 2009

**Abstract**

This paper introduces a novel methodology to shape boundary characterization, where a shape is modeled into a small-world complex network. It uses degree and joint degree measurements in a dynamic evolution network to compose a set of shape descriptors. The proposed shape characterization method has an efficient power of shape characterization, it is robust, noise tolerant, scale invariant and rotation invariant. A leaf plant classification experiment is presented on three image databases in order to evaluate the method and compare it with other descriptors in the literature (Fourier descriptors, curvature, Zernike moments and multiscale fractal dimension).

# 精读论文
## 中心思想
本文提出了一种以复杂网络理论为基础的图像形状识别的算法。作者将形状建模为一个小世界复杂网络，然后利用动态演化网络中的度(degree)特征与联合度(joint degree)特征来组成形状描述子。该方法在描述能力、鲁棒性、噪音抗性、尺度不变性、旋转不变性方面具有有效的性能。在文章的最后，作者在树叶分类问题上进行了实验，并与其它的方法进行了比较，包括傅里叶法、曲率、塞尼佳时刻、多尺度分形等。

## 方法描述
文章首先描述了如何将形状图像建模为复杂网络，然后提出了动态复杂网络的生成方法，最后说明了度特征和联合度特征的具体计算方法。
### 复杂网络构建
首先将图像的轮廓S定义为如下：<img src="http://chart.googleapis.com/chart?cht=tx&chl=S=[s_1, s_2, ..., s_N],  s_i=[x_i, y_i]" style="border:none;">是某个轮廓点，其数值是该轮廓点在图像中的像素位置。首先以轮廓点为节点，轮廓点间的距离作为边，构建无向图网络。轮廓点间的距离按照欧式空间距离计算：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=$d(s_i,s_j)=\sqrt{{(x_i-x_j)^2}%2B{(y_i-y_j)^2}}$" style="border:none;">

由此得到一个NxN的权重矩阵W：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=w_{ij}=d(s_i,s_j)" style="border:none;">

对它进行归一化：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=W =\frac{W}{max_{w_{ij}}}" style="border:none;">

但是这样建立的图是所有节点都连接的正则网络，设立阈值过滤得到部分相连的小世界网络。建立一张新图，该图中的边的长度是原图中大于阈值<img src="http://chart.googleapis.com/chart?cht=tx&chl=T_t" style="border:none;">的边。以x,y,z表示一个节点，其中z是原图中节点的度信息，可以得到高聚合度和具备小世界特性的网络，如：

![figure_1](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_1.png)

### 网络动态演变
不断改变阈值大小，动态生成一系列的图，并得到一系列的特征。并对生成图进行0-1过滤，小于阈值的置为0，大于阈值的置为1。如：

![figure_2](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_2.png)

### 提取度特征
度特征计算平均度<img src="http://chart.googleapis.com/chart?cht=tx&chl=average degree(k_u)" style="border:none;">和最大度<img src="http://chart.googleapis.com/chart?cht=tx&chl=max degree(k_k)" style="border:none;">。

### 提取联合度特征
计算权重矩阵的熵(H)、能量(E)与平均联合度(P)。

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\theta=[H(T_t),E(T_t),P(T_t)]" style="border:none;">

## 实验效果
文章将方法在树叶形状数据集上进行了测试：

![figure_3](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_3.png)

测试效果如下：

![figure_4](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_4.png)
