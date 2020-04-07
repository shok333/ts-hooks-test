import React from 'react';
import {connect} from 'react-redux';
import * as d3 from "d3";

class Post extends React.Component {
  componentDidMount () {
    const width = 800;
    const height = 600;

    const randomX = d3.randomNormal(width / 2, 80);
    const randomY = d3.randomNormal(height / 2, 80);
    let data = Array.from({length: 20}, () => [randomX(), randomY()]);

    console.log(data);
    // for (let i = 0; i < 400; i++) {
    //   data.push([Math.random() * 700, Math.random() * 500])
    // }

    const svg = d3.select(this.svg)
      .attr('width', 800)
      .attr('height', 600)
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", 10)
      .call((a, b, c) => {
        console.log(a, b, c);
      }, 2, 444);

    const zoom = d3.zoom()
    // .extent([[0, 0], [width, height]])
      .scaleExtent([1, 8])
      .on("zoom", zoomed);
  
    this.zoom = zoom;
      
    svg
      .call(zoom)

    function zoomed() {
      g.attr("transform", d3.event.transform);
    }

    return svg.node();
  }

  render () {
    const {posts} = this.props;

    return (
      <div>
        <svg ref={(svg) => this.svg = svg} />
        <button onClick={() => {
          d3.select(this.svg).transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
        }}>on click</button>
      </div>
    )
  }
}

function mapStateTProps (state) {
  return {
    posts: state.index.posts,
  }
}


export default connect(mapStateTProps)(Post);

