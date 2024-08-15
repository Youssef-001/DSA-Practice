class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.size = 0;
    this.ref = new Node(null);
  }

  append(item) {
    this.size += 1;
    const newNode = new Node(item);
    if (this.size <= 1) {
      this.head = newNode;
      this.ref = this.head;
    } else {
      this.head.next = newNode;
      this.head = this.head.next;
    }
  }

  prepend(item) {
    this.size += 1;
    const newNode = new Node(item);
    if (this.size <= 1) {
      this.head = newNode;
      this.ref = this.head;
    } else {
      newNode.next = this.ref;
      this.ref = newNode;
    }
  }

  pop() {
    let val;
    if (this.size == 0) return null;

    this.size -= 1;
    if (this.size == 1) {
      this.head = null;
      this.ref = null;
      return this.head.value;
    } else {
      let temp = new Node(0);
      temp = this.ref;

      while (temp.next != this.head) {
        temp = temp.next;
      }
      val = this.head.value;
      temp.next = null;
      this.head = temp;
    }
    return val;
  }

  at(index) {
    let counter = 0;

    if (index < 0 || index >= this.size) return null;

    let temp = new Node(null);
    temp = this.ref;

    while (counter < index) {
      temp = temp.next;
      counter += 1;
    }
    return temp.value;
  }

  contains(value) {
    let temp = new Node(null);
    temp = this.ref;

    while (temp != null) {
      if (temp.value == value) return true;
      temp = temp.next;
    }

    return false;
  }

  find(value) {
    let index = 0;
    if (this.size === 0) return null;
    let temp = new Node(null);
    temp = this.ref;

    while (temp != null) {
      if (temp.value == value) return index;
      index++;
      temp = temp.next;
    }

    return null;
  }

  toString() {
    let string = "";
    let temp = new Node(null);
    temp = this.ref;

    while (temp != null) {
      string += temp.value + " -> ";
      temp = temp.next;
    }
    string += "null";
    return string;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

let list = new LinkedList();

list.append(1);
list.append(2);
list.append(4);
list.append(5);
list.prepend(8);
list.prepend(10);

console.log(list.pop());
console.log(list.pop());

console.log(list.ref);

console.log(list.at(2)); // 4

console.log(list.contains(12)); // true

console.log(list.find(2));

console.log(list.toString());
