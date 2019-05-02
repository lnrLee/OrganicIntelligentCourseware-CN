# 个人信息
- 姓名：吴昊潜
- 学号：21821115
- 主题：复杂网络（Complex Networks）
- 邮箱：woolsey@zju.edu.cn

# 论文选择

[A complex network-based approach for boundary shape analysis](https://www.sciencedirect.com/science/article/pii/S0031320308002793)

Published in: Pattern Recognition, Volume 42, Issue 1, 2009

**Abstract**

This paper introduces a novel methodology to shape boundary characterization, where a shape is modeled into a small-world complex network. It uses degree and joint degree measurements in a dynamic evolution network to compose a set of shape descriptors. The proposed shape characterization method has an efficient power of shape characterization, it is robust, noise tolerant, scale invariant and rotation invariant. A leaf plant classification experiment is presented on three image databases in order to evaluate the method and compare it with other descriptors in the literature (Fourier descriptors, curvature, Zernike moments and multiscale fractal dimension).

# 精读论文
## 中心思想
本文提出了一种以复杂网络理论为基础的图像形状识别的算法。作者将形状建模为一个小世界复杂网络，然后利用动态演化网络中的度(degree)特征与联合度(joint degree)特征来组成形状描述子。该方法在描述能力、鲁棒性、噪音抗性、尺度不变性、旋转不变性方面具有有效的性能。在文章的最后，作者在树叶分类问题上进行了实验，并与其它的方法进行了比较，包括傅里叶法、曲率、塞尼佳时刻、多尺度分形等。

## 方法描述
文章首先描述了如何将形状图像建模为复杂网络，然后提出了动态复杂网络的生成方法，最后说明了度特征和联合度特征的具体计算方法。

**1.复杂网络构建**

首先将图像的轮廓S定义为如下：<img src="http://chart.googleapis.com/chart?cht=tx&chl=S=[s_1, s_2, ..., s_N],  s_i=[x_i, y_i]" style="border:none;">是某个轮廓点，其数值是该轮廓点在图像中的像素位置。首先以轮廓点为节点，轮廓点间的距离作为边，构建无向图网络。轮廓点间的距离按照欧式空间距离计算：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=$d(s_i,s_j)=\sqrt{{(x_i-x_j)^2}%2B{(y_i-y_j)^2}}$" style="border:none;">

由此得到一个NxN的权重矩阵W：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=w_{ij}=d(s_i,s_j)" style="border:none;">

对它进行归一化：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=W =\frac{W}{max_{w_{ij}}}" style="border:none;">

但是这样建立的图是所有节点都连接的正则网络，设立阈值过滤得到部分相连的小世界网络。建立一张新图，该图中的边的长度是原图中大于阈值<img src="http://chart.googleapis.com/chart?cht=tx&chl=T_t" style="border:none;">的边。以x,y,z表示一个节点，其中z是原图中节点的度信息，可以得到高聚合度和具备小世界特性的网络，如：

![figure_1](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_1.png)

**2.网络动态演变**

不断改变阈值大小，动态生成一系列的图，并得到一系列的特征。并对生成图进行0-1过滤，小于阈值的置为0，大于阈值的置为1。如：

![figure_2](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_2.png)

**3.提取度特征**

度特征计算平均度<img src="http://chart.googleapis.com/chart?cht=tx&chl=average degree(k_u)" style="border:none;">和最大度<img src="http://chart.googleapis.com/chart?cht=tx&chl=max degree(k_k)" style="border:none;">。

**4.提取联合度特征**

计算权重矩阵的熵(H)、能量(E)与平均联合度(P)。

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\theta=[H(T_t),E(T_t),P(T_t)]" style="border:none;">

## 实验效果
文章将方法在树叶形状数据集上进行了测试：

![figure_3](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_3.png)

测试效果如下：

![figure_4](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_4.png)

# 新方法探索
**基于形状颜色轮廓的球面距离复杂网络**

已精读的论文将复杂网络方法引入到图像识别领域，通过对形状轮廓边缘点建立复杂网络模型，利用复杂网络的基本拓补概念建立相应的识别参数。但该方法存储空间占用大，运算时间长。并且采用欧氏距离作为连接边，将横轴、纵轴方向的距离差异同等对待，引入一些不必要的节点连接边，增加了网络复杂度。

新方法在此基础上，将识别对象设置为人脸，从人脸中分别进行形状轮廓提取和颜色轮廓提取，然后计算球面距离而非平面欧氏距离作为边建立复杂网络，然后提取识别参数并分类。

**1.轮廓提取**

形状轮廓提取采用Canny边缘检测算法，取得的轮廓精确，运算开销小。

颜色轮廓提取，先对灰度图像W进行简单二值化处理。给定灰度阈值t, 0<=t<=max(W)，对所有像素点进行变换，得到二值图像。

由于二值图像中存在大面积黑色图块及粗线条轮廓，我们对该二值图像进行进一步处理，将四周也是黑色的黑色点置为白色。

**2.复杂网络建模**

建模方法与原方法类似，只是将边的距离由平面空间的欧式距离改为球面距离。给定二维平面上的任意两点<img src="http://chart.googleapis.com/chart?cht=tx&chl=P^i(x_i, y_i),P^j(x_j, y_j)" style="border:none;">，利用球极面投影可以分别得到它们在球面上的像点<img src="http://chart.googleapis.com/chart?cht=tx&chl=Q^i(x_i, y_i, z_i),Q^j(x_j, y_j, z_j)" style="border:none;">，则：

<img src="http://chart.googleapis.com/chart?cht=tx&chl=dis(Q^i, Q^j)=Rarccos(\frac{x_ix_j+y_iy_j+z_iz_j}{R^2})" style="border:none;">

**3.特征提取**

依照原方法提取度特征和联合度特征。

# 科研实践
我将改进后的复杂网络图像识别方法应用于人脸识别，进行了尝试。选取了较小的数据集，并与传统的PCA和Fisherface方法进行了比较。

我选择了美国耶鲁大学的YALE人脸数据库。该数据库包含15组人脸图像，每组11幅，共165幅，采用不同的拍摄视角，获取各种表情和各种脸部细节。数据库图像规格统一，其中，分辨率为100x100，灰度级为256，图片格式为bmp。

![figure_5](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_5.png)

由每组的前5幅组成训练集，共75张图。剩余图像用于测试。

首先进行轮廓点的提取，灰度阈值取值为40， 20， 180.距离阈值取值为2， 15， 62.然后建立动态复杂网络，在权重阈值由40以20的差值变化向180时，轮廓图如下：

![figure_5](https://github.com/LuffyDai/OrganicIntelligentCourseware-CN/blob/master/wuhaoqian/figure_6.png)

实验效果如下：

|训练样本数|PCA|Fisherface|本方法|
|----------|--|----------|------|
|5|83.3|62.22|86.67|
|6|80|92|87.27|
|7|85|98.33|95.15|
|8|91.11|97.78|97.57|
