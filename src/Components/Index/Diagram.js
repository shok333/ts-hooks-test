import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types';

const firstGroupWidth = 22;
const diagramHeight = 400;
// const secondGroupLeftMargin = 5;

export default function Diagram ({posts}) {
  const svgRef = useRef();
  const firstGroup = useRef();
  const secondGroup = useRef();
  const isReverse = useRef(false);
  const isMoveToTop = useRef(false);

  function animationHandler () {
    const svgWidth = svgRef.current.getBoundingClientRect().width;

    firstGroup.current
      .selectAll('rect')
      .transition()
      .delay((object, index) => (
        index * 50
      ))
      .attr('x', (object, index) => {
        const x = index * firstGroupWidth;

        if (!isReverse.current) {
          return `${svgWidth - firstGroupWidth - x}px`;
        } else {
          return `${x}px`
        }

      })

    isReverse.current = !isReverse.current;
    // isReverseChange();

    // secondGroup.current
    //   .selectAll('rect')
    //   .transition()
    //   .delay((object, index) => (
    //     index * 50
    //   ))
    //   .duration(1000)
    //   // .style("fill", "pink")
    //   .attr('x', (object, index) => {
    //     const x = index * firstGroupWidth;

    //     return `${svgWidth - firstGroupWidth - x + secondGroupLeftMargin}px`;
    //   })
    // console.log(isReverse);
  }

  function moveToTop () {
    firstGroup.current
      .selectAll('rect')
      .transition()
      .delay((object, index) => (
        index * 50
      ))
      .attr('y', ({x}) => {
        if (!isMoveToTop.current) {
          return `${0}px`
        } else {
          return `${diagramHeight - x}px`
        }
      })

      isMoveToTop.current = !isMoveToTop.current;
  }
 
  useEffect(() => {
    if (!firstGroup.current && !secondGroup.current) {
      const svg = d3.select(svgRef.current);

      svg
        .style('height', '400px');
  
      firstGroup.current = svg.append('g');
      secondGroup.current = svg.append('g');
    }

    const svgWidth = posts.length * firstGroupWidth;

    d3.select(svgRef.current)
      .style('width', `${svgWidth}px`)
      .attr('data-width', svgWidth);
    
    firstGroup.current
      .selectAll('rect')
      .data(posts, ({id}) => id)
      .enter()
      .append('rect')
      .attr('width', '20px')
      .attr('height', ({x}) => (`${x}px`))
      .attr('x', (object, index) => {
        const x = index * firstGroupWidth;
  
        if (isReverse.current) {
          return `${svgWidth - firstGroupWidth - x}px`;
        } else {
          return `${x}px`
        }
      })
      // .attr('y', ({x}) => (`${diagramHeight - x}px`))
      .attr('y', ({x}) => {
        if (isMoveToTop.current) {
          return `${0}px`
        } else {
          return `${diagramHeight - x}px`
        }
      })
      .attr('fill', 'red');

    firstGroup.current
      .selectAll('rect')
      .data(posts, ({id}) => id)
      .attr('x', (object, index) => {
        const x = index * firstGroupWidth;
  
        if (isReverse.current) {
          return `${svgWidth - firstGroupWidth - x}px`;
        } else {
          return `${x}px`
        }
      })
      .exit()
      .remove()

    // secondGroup.current
    //   .selectAll('rect')
    //   .data(posts, ({id}) => id)
    //   .enter()
    //   .append('rect')
    //   .attr('width', '10px')
    //   .attr('height', ({y}) => (`${y}px`))
    //   .attr('x', (data, index) => (`${index * firstGroupWidth + secondGroupLeftMargin}px`))
    //   .attr('y', ({y}) => (`${diagramHeight - y}px`))
    //   .attr('fill', 'blue');

    // secondGroup.current
    //   .selectAll('rect')
    //   .data(posts, ({id}) => id)
    //   .attr('x', (data, index) => (`${index * firstGroupWidth + secondGroupLeftMargin}px`))
    //   .exit()
    //   .remove();
  }, [posts]);



  return (
    <div>
      <svg ref={svgRef} />
      <button onClick={animationHandler}>animation</button>
      <button onClick={moveToTop}>top / bottom</button>
    </div>
  )
}

Diagram.propTypes = {
  posts: PropTypes.array
};