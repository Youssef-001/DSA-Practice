class Node {
  constructor(value) {
    this.right = null;
    this.left = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    if (array.length <= 0) return;
    array.sort((a, b) => a - b);
    let start = 0;
    let end = array.length;
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    node.right = this.buildTree(array.slice(mid + 1, end));
    node.left = this.buildTree(array.slice(0, mid));

    return node;
  }

  insert(item) {
    let newNode = new Node(item);
    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let temp = this.root;

    while (true) {
      if (temp == null) {
        temp = newNode;
        break;
      }
      if (newNode.value > temp.value) {
        if (temp.right == null) {
          temp.right = newNode;
          return;
        } else temp = temp.right;
      } else if (newNode.value < temp.value) {
        if (temp.left == null) {
          temp.left = newNode;
          return;
        } else temp = temp.left;
      }
    }
    return this.root;
  }

  DFS(node, arr) {
    if (node == null) return;

    this.DFS(node.left, arr);
    arr.push(node.value);
    this.DFS(node.right, arr);
  }

  deleteItem(item) {
    let subArray = [];
    let temp = this.root;
    if (temp == null) return -1;

    while (true) {
      if (temp == null) break;
      if (item == temp.value) break;
      else if (item > temp.value) {
        temp = temp.right;
      } else {
        temp = temp.left;
      }
    }
    if (temp == null) return -1;

    // if it's leaf node

    if (temp.left == null && temp.right == null) {
      let temp2 = this.root;

      while (true) {
        if (temp2.right == temp) {
          temp2.right = null;
          break;
        } else if (temp2.left == temp) {
          temp2.left = null;
          break;
        } else if (temp.value > temp2.value) {
          temp2 = temp2.right;
        } else if (temp.value < temp2.value) {
          temp2 = temp2.left;
        }
      }
    } else {
      this.DFS(temp, subArray);
      // remove root node
      for (let i = 0; i < subArray.length; i++) {
        if (subArray[i] == temp.value) {
          subArray.splice(i, 1);
        }
      }

      // build subtree with the subArray;

      let newTree = this.buildTree(subArray);

      let pointer = this.root;

      while (true) {
        if (pointer.right == temp) {
          pointer.right = newTree;
          break;
        } else if (pointer.left == temp) {
          pointer.left = newTree;
          break;
        } else if (temp.value > pointer.value) {
          pointer = pointer.right;
        } else if (temp.value < pointer.value) {
          pointer = pointer.left;
        }
      }
    }

    return this.root;
  }

  find(value) {
    if (this.root == null) return -1;

    let temp = this.root;

    while (true) {
      if (temp == null) return -1;
      if (temp.value == value) return temp;
      else if (value > temp.value) {
        temp = temp.right;
      } else temp = temp.left;
    }
  }

  levelOrder(callback) {
    let temp = this.root;
    let queue = [];
    queue.push(temp);

    while (queue.length > 0) {
      let size = queue.length;

      let front = queue[0];
      queue.shift();
      if (front.left != null) queue.push(front.left);
      if (front.right != null) queue.push(front.right);

      callback(front);
    }
  }

  inOrder(callback, root) {
    if (root == null) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root) {
    if (root == null) return;
    callback(root);
    this.inOrder(callback, root.left);
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root) {
    if (root == null) return;
    this.inOrder(callback, root.left);
    this.inOrder(callback, root.right);
    callback(root);
  }

  depth(node) {
    let temp = this.root;
    let len = 0;
    if (temp == null) return null;

    while (true) {
      if (temp == node) return len;
      else if (node.value > temp.value) temp = temp.right;
      else temp = temp.left;
      len += 1;
    }

    return -1;
  }

  height(node) {
    if (node == null) return 0;
    let right = this.height(node.right);
    let left = this.height(node.left);
    return Math.max(right, left) + 1;
  }

  isBalanced(node) {
    if (node == null) return;
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1)
      return false;

    this.isBalanced(node.left);
    this.isBalanced(node.right);

    return true;
  }

  rebalance() {
    let rebalanceArr = [];
    this.preOrder((node) => {
      rebalanceArr.push(node.value);
    }, this.root);

    rebalanceArr = rebalanceArr.sort((a, b) => a - b);
    console.log(rebalanceArr);
    this.root = this.buildTree(rebalanceArr);
  }
}

let Tree = new BinarySearchTree();

// Tree.insert("99");
Tree.root = Tree.buildTree([1, 2, 3, 4, 6, 7, 8, 9, 10]);

console.log("isBalanced: ", Tree.isBalanced(Tree.root));

Tree.levelOrder((node) => {
  console.log(node.value);
});

Tree.preOrder((node) => {
  console.log(node.value);
}, Tree.root);

Tree.inOrder((node) => {
  console.log(node.value);
}, Tree.root);

Tree.postOrder((node) => {
  console.log(node.value);
}, Tree.root);

Tree.insert(0);
Tree.insert(11);
Tree.insert(12);

Tree.insert(13);
Tree.insert(15);

console.log("Is balanced: ", Tree.isBalanced(Tree.root));

console.log(Tree.root);
Tree.rebalance();
console.log(Tree.root);

console.log("is Balanced after rebalance: ", Tree.isBalanced(Tree.root));

console.log("InOrder traversal: ");
Tree.inOrder((node) => {
  console.log(node.value);
}, Tree.root);
