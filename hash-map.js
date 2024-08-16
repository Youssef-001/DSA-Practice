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

class HashMap {
  constructor() {
    this.size = 16;
    this.buckets = new Array(this.size).fill(null);
    this.count = 0;
    this.threshold = 0.75;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  resize() {
    let newSize = this.size * 2;
    let newBuckets = new Array(newSize).fill(null);

    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] != null) {
        let node = this.buckets[i].ref;
        while (node != null) {
          let newIndex = this.hash(node.value.key) % newSize;
          if (newBuckets[newIndex] == null) {
            newBuckets[newIndex] = new LinkedList();
          }

          newBuckets[newIndex].append(node.value);
          node = node.next;
        }
      }
    }
    this.buckets = newBuckets;
    this.size = newSize;
  }

  set(key, value) {
    let loadFactor = this.count / this.size;
    const index = this.hash(key) % this.size;

    if (loadFactor > this.threshold) {
      this.resize();
    }

    this.count++;
    let temp = new Node();
    let keyFound = false;

    if (this.buckets[index] == null) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append({ key, value });
      return;
    }

    temp = this.buckets[index].ref;
    let it = 0;

    while (temp != null) {
      if (temp.value.key == key) {
        keyFound = true;

        break;
      } else {
        temp = temp.next;
        it++;
      }
    }
    if (keyFound) {
      let temp2 = new Node();
      temp2 = this.buckets[index].ref;
      while (it > 0) {
        temp2 = temp2.next;
        it--;
      }
      temp2.value = { key, value };
    } else {
      this.buckets[index].append({ key, value });
    }
  }

  get(key) {
    const index = this.hash(key) % this.size;
    if (this.buckets[index] == null) return -1;
    else {
      let temp = new Node();
      temp = this.buckets[index].ref;
      while (temp != null) {
        if (temp.value.key == key) return temp.value.value;
        else temp = temp.next;
      }
      return -1;
    }
  }

  has(key) {
    const index = this.hash(key) % this.size;
    if (this.buckets[index] == null) return false;

    let temp = new Node();
    temp = this.buckets[index].ref;
    while (temp != null) {
      if (temp.value.key == key) return true;
      else temp = temp.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key) % this.size;
    if (this.buckets[index] == null) return false;
    let temp = new Node();
    temp = this.buckets[index].ref;

    if (this.buckets[index].size == 1) {
      if (temp.value.key == key) {
        this.buckets[index] = null;
        return true;
      }
    } else if (temp.value.key == key) {
      this.buckets[index].ref = temp.next;
      this.buckets[index].size -= 1;
      return true;
    } else {
      while (this.buckets[index].ref.next.value.key != key) {
        if (
          this.buckets[index].ref.next == null &&
          this.buckets[index].ref.value.key != key
        )
          return false;
        this.buckets[index].ref = this.buckets[index].ref.next;
      }

      this.buckets[index].ref.next = this.buckets[index].ref.next.next;
      this.buckets[index].size -= 1;
      this.buckets[index].ref = temp;

      if (this.buckets[index].head.value.key == key)
        this.buckets[index].head = null;
      return true;
    }
  }

  length() {
    let keys = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null) keys += this.buckets[i].size;
    }
    return keys;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = null;
    }
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null) {
        let temp = this.buckets[i].ref;
        while (temp != null) {
          keys.push(temp.value.key);
          temp = temp.next;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null) {
        let temp = this.buckets[i].ref;
        while (temp != null) {
          values.push(temp.value.value);
          temp = temp.next;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != null) {
        let temp = this.buckets[i].ref;
        while (temp != null) {
          entries.push({ key: temp.value.key, value: temp.value.value });
          temp = temp.next;
        }
      }
    }

    return entries;
  }
}

let mp = new HashMap();

mp.set("Ea", 10);
mp.set("Fb", 12);
mp.set("apple", 8);
mp.set("apple", 9);
mp.set("apple", 97);
mp.set("banana", 4);
mp.set("watermelon", 18);
mp.set("peach", 7);

mp.set("grapes", 7);

mp.set("apple", "red");
mp.set("banana", "yellow");
mp.set("carrot", "orange");
mp.set("dog", "brown");
mp.set("elephant", "gray");
mp.set("frog", "green");
mp.set("grape", "purple");
mp.set("hat", "black");
mp.set("ice cream", "white");
mp.set("jacket", "blue");
mp.set("kite", "pink");
mp.set("lion", "golden");
console.log(mp.get("hellllo"));

console.log(mp.remove("banana"));
console.log(mp.remove("watermelon"));

console.log(mp.has("apple"));
console.log(mp.length());
// mp.clear();
console.log(mp);
console.log(mp.keys());
console.log(mp.values());
console.log(mp.entries());

// console.log(mp.get("banana"));
