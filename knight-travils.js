let board = [];

for (let i = 0; i < 8; i++) {
  board.push([0, 0, 0, 0, 0, 0, 0, 0]);
}

let visited = [];

for (let i = 0; i < 8; i++) {
  visited.push([false, false, false, false, false, false, false, false]);
}

let cap = [];
for (let i = 0; i < 8; i++) {
  cap.push([[], [], [], [], [], [], [], []]);
}

let ways = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

let moves = [];

let target = [4, 3];

function BFS(i, j) {
  let q = [];
  q.push([i, j]);

  while (q.length > 0) {
    let front = q[0];
    q.shift();

    if (board[target[0]][target[1]] != 0) break;

    for (let i = 0; i < ways.length; i++) {
      let row = ways[i][0];
      let col = ways[i][1];

      if (
        front[0] + row >= 0 &&
        front[0] + row < 8 &&
        front[1] + col >= 0 &&
        front[1] + col < 8
      ) {
        if (visited[row + front[0]][col + front[1]] != true)
          q.push([row + front[0], col + front[1]]);

        visited[row + front[0]][col + front[1]] = true;

        if (board[row + front[0]][col + front[1]] == 0) {
          board[row + front[0]][col + front[1]] = board[front[0]][front[1]] + 1;
        } else {
          board[row + front[0]][col + front[1]] = Math.min(
            board[row + front[0]][col + front[1]],
            board[front[0]][front[1]] + 1
          );
        }

        cap[row + front[0]][col + front[1]].push([front[0], front[1]]);
      }
    }
  }

  console.log("It took you ", board[target[0]][target[1]], " moves!");
}

let start = [3, 3];
BFS(start[0], start[1]);
let path = [];
path.push(target);
let i = target[0];
let j = target[1];
while (true) {
  if (i == start[0] && j == start[1]) break;

  let r = cap[i][j];
  path.push(r[0]);
  i = r[0][0];
  j = r[0][1];
}

let pathString = "";

for (let i = 0; i < path.length; i++) {
  pathString += `[${path[i][0]},${path[i][1]}] => `;
}

pathString = pathString.substr(0, pathString.length - 3);
console.log("Your path is: ", pathString);
