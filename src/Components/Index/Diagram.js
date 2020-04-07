import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types';

const firstGroupWidth = 20;
const firstGroupMargin = 2
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
        const x = index * (firstGroupWidth + firstGroupMargin);

        if (!isReverse.current) {
          return svgWidth - firstGroupWidth - firstGroupMargin - x;
        } else {
          return x
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
          return 0
        } else {
          return diagramHeight - x
        }
      })

      isMoveToTop.current = !isMoveToTop.current;
  }

  function rotate () {
    let step = 1;

    function rotateStep (step) {
      firstGroup.current
        .selectAll('rect')
        .transition()
        .duration(100)
        .attr("transform", (a, index, nodes) => {    
          const centerX = index * (firstGroupWidth + firstGroupMargin) + firstGroupWidth / 2;
          const centerY = diagramHeight - a.x / 2;

          return `rotate(${step}, ${centerX}, ${centerY})`
        })
        .on('end', (a, index) => {
          if (!index) {
            step = step + 1;
          }

          rotateStep(step);
        });
    }

    rotateStep(step);

    
      // .transition()
      // .attr("transform", (a, index, nodes) => {
      //   const x = index * (firstGroupWidth + firstGroupMargin);
  
      //   const centerX = 0;
      //   const centerY = diagramHeight - a.x;
      //   console.log(centerX, centerY);

      //   return `rotate(${index === 0 ? 180 : 0}, ${centerX + firstGroupWidth / 2}, ${centerY})`
      // })
  }
 
  useEffect(() => {
    if (!firstGroup.current && !secondGroup.current) {
      const svg = d3.select(svgRef.current);

      svg
        .style('height', 400)
  
      firstGroup.current = svg.append('g');
      secondGroup.current = svg.append('g');
    }

    const svgWidth = posts.length * (firstGroupWidth + firstGroupMargin);

    d3.select(svgRef.current)
      .style('width', svgWidth)
      // .attr("viewBox", [0, 0, svgWidth, 400])
      .attr('data-width', svgWidth)
      // .call(d3.zoom().on("zoom", function () {
      //   d3.select(svgRef.current).attr("transform", d3.event.transform)
      // }));
    
    firstGroup.current
      .selectAll('rect')
      .data(posts, ({id}) => id)
      .enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', ({x}) => (x))
      .attr('x', (object, index) => {
        const x = index * (firstGroupWidth + firstGroupMargin);
  
        if (isReverse.current) {
          return svgWidth - firstGroupWidth - firstGroupMargin - x;
        } else {
          return x
        }
      })
      .attr('y', ({x}) => {
        if (isMoveToTop.current) {
          return 0
        } else {
          return diagramHeight - x
        }
      })
      .attr('fill', 'red')

    let deltaX, deltaY;

    const zoom = d3.zoom()
      .duration(2000)
      .scaleExtent([1, 2]) //число уровней zoom
      .on("zoom", function (transform) {
        console.log(transform);
        // console.log(d3.zoomIdentity);
        d3.select(this)
          .attr("transform", d3.event.transform)
      })
      // .wheelDelta(() =>  { //размер zoom колеса прокрутки
      //   return -d3.event.deltaY * (d3.event.deltaMode === 1 ? 0.05 : d3.event.deltaMode ? 1 : 0.002);
      // })

    firstGroup.current
      .selectAll('rect')
      .call(zoom, zoom.transform)
      // .on("dblclick.zoom", null) //отмена zoom
      // .on("wheel.zoom", null) //отмена zoom
      .call(
        d3.drag()
          .on("start", function () {
              const current = d3.select(this);

              deltaX = current.attr("x") - d3.event.x;
              deltaY = current.attr("y") - d3.event.y;
          })
          .on("drag", function () {
              d3.select(this)
                  .attr("x", d3.event.x + deltaX)
                  .attr("y", d3.event.y + deltaY);
          })
      )
      .on('click', (obj, index, nodes) => {
        // console.log(this);
        nodes[index].transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
      })

    firstGroup.current
      .selectAll('rect')
      .data(posts, ({id}) => id)
      .attr('x', (object, index) => {
        const x = index * (firstGroupWidth + firstGroupMargin);
  
        if (isReverse.current) {
          return svgWidth - firstGroupWidth - firstGroupMargin - x;
        } else {
          return x
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
      <button onClick={rotate}>rotate</button>
    </div>
  )
}

Diagram.propTypes = {
  posts: PropTypes.array
};