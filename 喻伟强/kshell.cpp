
class graph
{
  public:
    static const int maxNode = 1e5;
    graph();
    ~graph() {}
    const int getNodeNum() { return nodeNum; }
    const int getAdjMatVal(int i, int j) { return adjMat[i][j]; }
    const int *getDegree() { return degree; }
    const bool *getIsVertex() { return isVertex; }
    const int *getShellVal() { return shellVal; }
    const int *getRmOrder() { return rmOrder; }

    void delVertex(int idx)
    {
        nodeNum--;
        for (int i = 0; i < nodeNum; i++)
        {
            if (isVertex[i] && adjMat[i][idx] == 1)
            {
                degree[i]--;
                adjMat[i][idx] = 0;
                adjMat[idx][i] = 0;
            }
        }
        isVertex[idx] = false;
    }

    void setShellVal(int idx, int res) { shellVal[idx] = res; }
    void setRmOrder(int idx, int res) { rmOrder[idx] = res; }

  private:
    int nodeNum;                  // 节点数
    int adjMat[maxNode][maxNode]; // 邻接矩阵
    int degree[maxNode];          // 节点度
    int shellVal[maxNode];        // 节点ks值
    int rmOrder[maxNode];         // 节点删除顺序
    bool isVertex[maxNode];       // 节点有效
};

void kshell(graph G)
{
    int i = 1;        // degree
    int delOrder = 1; // record nodes removed order
    while (G.getNodeNum() != 0)
    {
        for (int j = 0; j < G.getNodeNum(); j++)
        {
            if (G.getDegree[j] <= i && G.getIsVertex[j])
            {
                G.setShellVal(j, i);
                G.setRmOrder(j, delOrder);
                delOrder++;
                //remove the vertex
                G.delVertex(j);
                j = 0;
            }
        }
        i++;
    }
}

double *calKSC(graph G, double alfa, double bata, double gama, double mu)
{
    int nodeNum = G.getNodeNum();
    int eu[nodeNum], eeu[nodeNum], eel[nodeNum], el[nodeNum];
    double Ksc[nodeNum];
    for (int i = 0; i < nodeNum; i++)
    {
        for (int j = i + 1; j < nodeNum; j++)
        {
            if (G.getAdjMatVal[i, j] == 1)
            {
                if (G.getShellVal[i] > G.getShellVal[j])
                {
                    eu[i]++;
                }
                else if (G.getShellVal[i] == G.getShellVal[j])
                {
                    if (G.getRmOrder[i] < G.getRmOrder[j])
                    {
                        eel[i]++;
                    }
                    else
                    {
                        eeu[i]++;
                    }
                }
                else
                {
                    el[i]++;
                }
            }
        }
    }
    for (int i = 0; i < nodeNum; i++)
    {
        Ksc[i] = alfa * eu[i] + bata * eeu[i] + gama * eel[i] + mu * el[i];
    }
    return Ksc;
}