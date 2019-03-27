姓名：王昊天

邮箱：wanght816@zju.edu.cn

学号：11818172

论文选题：Scalable training of artificial neural networks with adaptive sparse connectivity inspired by network science


Abstract:Through the success of deep learning in various domains, artificial neural networks are currently among the most used artificial intelligence methods. Taking inspiration from the network properties of biological neural networks (e.g. sparsity, scale-freeness), we argue that (contrary to general practice) artificial neural networks, too, should not have fully-connected layers. Here we propose sparse evolutionary training of artificial neural networks, an algorithm which evolves an initial sparse topology (Erdős–Rényi random graph) of two consecutive layers of neurons into a scale-free topology, during learning. Our method replaces artificial neural networks fully-connected layers with sparse ones before training, reducing quadratically the number of parameters, with no decrease in accuracy. We demonstrate our claims on restricted Boltzmann machines, multi-layer perceptrons, and convolutional neural networks for unsupervised and supervised learning on 15 datasets. Our approach has the potential to enable artificial neural networks to scale up beyond what is currently possible.


摘要：深度学习在多个领域获得了成功，人工神经网络是目前在人工智能中用得最多的模型。从生物神经网络的网络属性中获得启示（例如：稀疏性，无标度性），我们认为人工神经网络不应该是全连接的层。我们提出了一个人工神经网络的稀疏进化训练，在训练中让两层神经元间的连接从初始的稀疏拓扑结构开始进化为无度量的拓扑结构。我们在训练前用疏松的结构代替人工神经网络的全连接层，极大减少参数个数，但不减少准确性。我们通过15个数据集上用无监督和有监督学习的受限玻尔兹曼机、多层感知器和卷积神经网络展示了用我们的方法。我们的方法使人工神经网络有能力扩展到目前可能的范围之外。


实现方法：受生物神经网络稀疏性和无度量性的启发，设计这种训练方法，首先在两层神经元间随机建立稀疏的连接，训练过程中，删除权重接近为0的连接，再随机加上同等数量的连接。最终训练完成后形成的具有稀疏性，无度量性的连接网络。在训练过程中不但训练权重，还训练网络结构。因在训练过程中减少权重的量，可以减少训练时间，也意味着可以扩大现有的神经网络。图例见文章Fig.1
