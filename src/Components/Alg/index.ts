import React from 'react';

type IType = Item | null;

class Item {
  value: number;
  next: IType;
  constructor (value: number, next: Item | null) {
    this.value = value;
    this.next = next;
  }
}

let queue: IType = null;

function addItem (value: any, current: IType): Item {
  return new Item(value, current);
}

for (let i = 5; i > 0; i--) {
  queue = addItem(i, queue);
}

let current: IType = queue;

while (current)  {
  console.log(current.value)
  current = current.next;
}

function reverse (current: IType) {
  let prev = null;

  while (current) {
    const next = current.next;

    current.next = prev;
    prev = current;

    current = next;
  }

  return prev
}

let reversedQueue: IType = reverse(queue);

while (reversedQueue)  {
  console.log(reversedQueue.value)
  reversedQueue = reversedQueue.next;
}


export default class Alg extends React.Component {
  render () {
    return 'Alg';
  }
}