// Try edit message
let queue;

class Item {
  constructor (value, next) {
    this.value = value;
    this.next = next;
  }
}

function addItem (value) {
  const link = queue;

  queue = new Item(value, link);
}

for (let i = 5; i > 0; i--) {
  addItem(i);
}

let current = queue;

console.log(current);

while (current)  {
  console.log(current.value)
  current = current.next;
}

console.log('-----------------');

function reverse () {
  let current = queue;
  let prev;

  while (current) {
    const next = current.next;

    current.next = prev;
    prev = current;

    current = next;
  }

  return prev
}

// while (current)  {
//   console.log(current.value)
//   current = current.next;
// }

let reversedQueue = reverse();

while (reversedQueue)  {
  console.log(reversedQueue.value)
  reversedQueue = reversedQueue.next;
}

