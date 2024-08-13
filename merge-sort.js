let array = [3, 2, 1, 13, 8, 5, 0, 1];
let array2 = [105, 79, 100, 110];

// Implement merge sort algorithm

function merge(arr1, arr2) {
  let merged = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      merged.push(arr2[j]);
      j++;
    }
  }

  console.log(i, j);

  if (i != arr1.length) {
    merged = merged.concat(arr1.slice(i));
  }

  if (j != arr2.length) {
    merged = merged.concat(arr2.slice(j));
  }

  return merged;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

console.log(mergeSort(array));
console.log(mergeSort(array2));
