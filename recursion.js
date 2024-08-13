function sumTo(n) {
  if (n == 1) return 1;
  else {
    return n + sumTo(n - 1);
  }
}

function factorial(n) {
  if (n == 1) return 1;
  else {
    return n * factorial(n - 1);
  }
}

function fibbonaci(n) {
  if (n <= 2) return 1;
  else {
    return fibbonaci(n - 1) + fibbonaci(n - 2);
  }
}

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function collatz(n) {
  if (n == 1) return 0;
  else if (n % 2 == 0) return 1 + collatz(n / 2);
  else return 1 + collatz(3 * n + 1);
}

function powerRecursive(n, p) {
  if (p == 0) return 0;

  if (p == 1) return n;
  else return n * powerRecursive(n, p - 1);
}

function printnList(list) {
  if (list.next == null) return;
  else {
    console.log(list.value); // swap for reversed list
    printnList(list.next);
  }
}

function allRecrusive(arr, callback) {
  if (arr.length == 0) return true;

  let first = arr[0];
  if (callback(first) == false) return false;
  else {
    return allRecrusive(arr.slice(1), callback);
  }
}

function productArray(arr) {
  if (arr.length == 0) return 1;
  else {
    return arr[0] * productArray(arr.slice(1));
  }
}

function searchRecursive(object, value) {
  for (let obj in object) {
    if (typeof object[obj] == "object")
      return searchRecursive(object[obj], value);
    if (object[obj] == value) return true;
  }
  return false;
}

function squareRecursive(array) {
  if (array.length == 0) return 0;

  let first = array[0];
  if (Array.isArray(first)) {
    return squareRecursive(first) + squareRecursive(array.slice(1));
  } else {
    return first * first + squareRecursive(array.slice(1));
  }
}

function replicate(num, rep, res = []) {
  if (rep <= 0) return [];
  if (num <= 0) return res;
  else {
    res.push(rep);
    return replicate(num - 1, rep, res);
  }
}

printnList(list);
console.log(collatz(6));

console.log(powerRecursive(2, 4));

var allAreLessThanSeven = allRecrusive([1, 2, 12], function (num) {
  return num < 7;
});

console.log(allAreLessThanSeven); // false

console.log(productArray([2, 1, 2, 5]));

var nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
          },
        },
      },
    },
  },
};

console.log(searchRecursive(nestedObject, "foo"));

// console.log(totalIntegers([[[5], 3], 0, 2, [4, [5, 6]]]));

console.log(squareRecursive([1, 2, [3, 4], 5]));

console.log(replicate(-2, 6)); // []
