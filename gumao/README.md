# 个人信息
- 姓名：顾茅
- 学号：21821134
- 主题：复杂网络（Complex Networks）
- 邮箱：515424159@qq.com

# 论文选择

[Modeling User Behavior in Social Media with Complex Agents](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=2ahUKEwjAhKGCrZLhAhUEt54KHQC-DVoQFjABegQIBBAC&url=https%3A%2F%2Fwww.thinkmind.org%2Fdownload.php%3Farticleid%3Dhuso_2017_2_10_80027&usg=AOvVaw118-6qP55JpJ8MHQ43Chjl)

- Abstract

Social media like Facebook, Twitter, or Google+ have become predominant means of communication. However, their distributed structure and dynamic interaction processes make it difﬁcult to analyze and understand that communication. Thus, we propose agent-based modeling and simulation of user behavior for analyzing communication dynamics in social media. We develop an agent decision-making method that models motivations of media users and their impact on behavior by means of social actor types. Moreover, we apply this model to Twitter communication accompanying a German television program. Our evaluation shows that different actor constellations within a population of agents drastically impact the dynamics of this communication.

## 1.引言
本世纪最引人注目的进步之一是信息和通信技术的无所不在。在我们日常生活中建立计算机系统以及私人家庭与互联网的联系已经启动并仍在推动数字革命。社交媒体已成为私人和专业用户的主要通信手段。
理解这些沟通过程在商业和政治中都很重要，可以为社交媒体制定沟通策略。如果相同的动态分配负面意见，新兴的大规模批评可能会危及公司的商业成功。预测社交媒体用户对此类活动的可能反应至关重要，以避免意外影响或针对这些影响制定适当的反制策略。
社交媒体的固有分布以及其中用户交互的动态使得分析和理解这种交流变得困难。因此，人工分析得到了计算语言学，数据挖掘和模拟方法的补充[6]。这些方法有助于识别对话主题，识别用户社区，并模拟社交网络中的信息传播。
特别是基于代理的社交模拟用于理解相互关联的通信活动的复杂动态。他们通过艺术代理模拟人类行为，以探索不同社会行动者星座和各种情况在实验环境中的影响。本文开发了一个基于代理的用户行为模型，用于分析社交媒体中的通信动态。

## 2.社交媒体分析
社会行为者理论和基于代理的建模作为动态分析技术的基础。
A.社交媒体社交媒体结构通信流程，用一组用户（节点）和用户之间的关系（边缘）来描述。
B.沟通:人类交流可以被视为个体的一系列行动，其中发送者的行为影响接收者的行为[12]。发件人使用一组字符对消息进行编码，该消息使用信息媒体传输。接收器使用一组自己的字符来解码和解释消息，并使用相同的机制返回反馈。发送者对消息的制定和传输以及接收者的相应反应形成了社交媒体用户可用的交流活动。
C.社会行动者
沟通本质上是社会性的。事实上，社会性可以被认为完全由交流组成。社会系统来自社会行动者选择的相互关联的交流活动。这些演员受到观察到的社会情况的影响。他们决定他们对这种情况的反应。本文将actor类型应用于社交媒体中基于代理的用户行为建模。
D.相关工作：基于代理的人类行为建模
通过将现实世界的行为者建模为软件代理，可以模拟个体行为和微观层面上的行为预期，从而在宏观层面上产生紧急效应。在社会科学方面，将这种演员模型用于模拟研究被称为基于代理的社会模拟。

## 3.建模用户行为的复杂代理
这个概念涵盖了各个社会行为者，他们各自的决策以及媒体用户群体。
模拟有关特定主题的消息选择，以便在有限的时间范围内在社交媒体平台上发布。每个决策情况都接收一个或两个的输入用于描述该情况的更多关键字。
A.社会行为者类型和决策
除了目前的情况，其社会行动者类型决定了代理人的决策。所有预期值函数应涵盖相同的值范围，以使它们彼此相当。该范围取决于可用活动选项的数量及其在特定应用程序方案中的效果。
B.演员类型组合和人口
允许各个代理中的参与者类型的组合来表示演员的社会倾向往往会被几种基本动机的混合描述得更充分。除了在单个代理中组合演员类型之外，还可以在整个代理群体中混合不同的代理。

## 4.应用于伴随德国电视节目的Twitter上的通信流程
将基于代理的建模概念应用于对Twitter上通信流程中的用户行为的分析。特别是，我们在德国电视连续剧“Tatort”（意思是犯罪现场）的一集中模拟了现场推特行为。 “Tatort”自1970年开始运作，是最受欢迎的德国电视连续剧，吸引了所有社会群体，性别和年龄的广泛受众。 2014年5月18日，我们使用Tweets关于“Alle meine Jungs”（我的所有男孩）一集的数据集。该数据集包含八个截然不同的非常高或非常低的Twitter活动阶段，这些阶段对应于剧集的特定场景。
A.代理活动选项我们的数据集中的推文可以根据它们在两个不同维度上的情绪和音调进行分类。
B.代理决策在我们的应用示例中，定义代理决策的参与者类型代表社交媒体通信中的典型行为角色和动机。

## 5.模拟该场景中的用户行为来评估我们的模型
作为基于代理的建模方法的概念证明，我们在JAVA程序中实现了上述代理类型和决策算法。使用该程序来模拟来自不同代理的不同群体的用户行为。
比较两种不同的设置。第一个由具有混合行为者类型的同质代理人群组成。第二设置包括异构代理群。
结果发现，对于同质人群，结果显示大多数负面而不是开玩笑的推文。相比之下，异质人口导致更多样化的行为。
总体而言，这些结果表明，个体代理内的行为者类型的组合以及它们在异构群体中的混合极大地影响了模拟社交媒体通信的紧急动态。这表明个体代理的建模动机可以产生行为异质性，其他模型必须通过例如随机噪声来人为地引入。

## 6.展望未来可能的工作
一种基于代理的社交媒体用户行为模型。该模型有助于动态分析复杂的通信过程
在未来的工作中会考虑一些扩展。
1）首先，我们正在努力校准模型，以准确模仿在我们的现实世界示例中观察到的用户交互。当将四种基本行为者类型组合成复杂的代理人和群体时，这将提供对可实现的现实主义的洞察力。
2）其次，将代理决策方法与现有的信息扩散方法相结合将是有趣的。
3）最后，更详细地为代理的活动选项建模。
