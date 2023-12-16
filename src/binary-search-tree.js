const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base
  }

  add(data) {
    this.base = addWithin(this.base, data);

    function addWithin(node, data){
      if(!node){
        return new Node(data);
      }

      if(node.data === data){
        return node
      }

      if(data < node.data){
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.base, data);

    function searchWithin(node, data){
      if(!node){
        return false;
      }

      if(node.data === data){
        return true
      }

      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data);
    }
  }

  find(data) {
    return findWithin(this.base, data);

    function findWithin(node, data){
      if(!node){
        return null;
      }

      if(node.data === data){
        return node
      }

      return data < node.data ? findWithin(node.left, data) : findWithin(node.right, data);
    }
  }

  remove(data) {
    this.base = removeNode(this.base, data);

    function removeNode(node, data) {
      if(!node){
        return false;
      }

      if(data < node.data){
        node.left = removeNode(node.left, data);
        return node;
      } else if(node.data < data){
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // is list
        if(!node.left && !node.right){
          return null;
        }

        if(!node.left){
          // is exist only right child
          node = node.right;
          return node;
        }

        if(!node.right){
          // is exist only left child
          node = node.left;
          return node;
        }

        // is exist right & left children
        let minFromRight = node.right;
        while(minFromRight.left){
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }


    }
  }

  min() {
    if(!this.base){
      return;
    }

    let node = this.base;
    while(node.left){
      node = node.left;
    }

    return node.data;
  }

  max() {
    if(!this.base){
      return;
    }

    let node = this.base;
    while(node.right){
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};