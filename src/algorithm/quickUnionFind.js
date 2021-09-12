export default class QuickUnionFind {
  constructor(nodes) {
    this.disjointSets = nodes.reduce((accum, nodeId) => {
      accum[nodeId] = nodeId;
      return accum;
    }, {});
  }

  connect(i, j) {
    if (!this.isConnected(i, j)) {
      let smallerOne = i;
      let biggerOne = j;

      if (j < i) {
        smallerOne = j;
        biggerOne = i;
      }

      this.disjointSets[this.findParent(biggerOne)] =
        this.findParent(smallerOne);
    }
  }

  findParent(i) {
    const subParent = this.disjointSets[i];
    if (parseInt(subParent) === parseInt(i)) {
      return i;
    }

    this.disjointSets[i] = this.findParent(subParent);
    return this.disjointSets[i];
  }

  isConnected(i, j) {
    if (i === j) {
      return true;
    } else {
      return this.findParent(i) === this.findParent(j);
    }
  }
}
