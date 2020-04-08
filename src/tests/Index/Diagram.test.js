import React from 'react';
import { resizeTo } from 'window-resizeto'
import { render, fireEvent } from '@testing-library/react';
import Diagram from '../../Components/Index/Diagram';

const firstGroupWidth = 20;
const firstGroupMargin = 2
const diagramHeight = 400;
const posts = [
  {name: 'item1', id: 1, x: 100, y:50},
  {name: 'item2', id: 2, x: 200, y:30},
  {name: 'item3', id: 3, x: 250, y:60},
  {name: 'item4', id: 4, x: 290, y:30}
]

test('check Diagram', () => {
  // window.resizeTo(500, 500)

  const {container, getByText} = render(
    <Diagram posts={posts}/>
  );

  const groups = container.getElementsByTagName('g');
  const firstGroupChildren = groups[0].children;

  expect(firstGroupChildren.length).toBe(4);

  [].forEach.call(firstGroupChildren, (item, index) => {
    expect(item.getAttribute('fill')).toBe('red');
    expect(parseInt(item.getAttribute('width'))).toBe(20);
    expect(parseInt(item.getAttribute('height'))).toEqual(posts[index].x);
    // console.log(item, item.getBoundingClientRect());
    // console.log(item.get)
  });

  const animationButton = getByText('animation');
  console.log(animationButton.getClientRects());
});