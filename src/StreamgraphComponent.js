import React, { useEffect } from 'react';
import * as d3 from 'd3';
import vsBenchmarkStats from './vsBenchmark';

const svgID = (Math.floor(Math.random() * 1000000) + 1000).toString(16) + '_d3graph';

export default function StreamgraphComponent(props) {
  useEffect(() => renderChart(svgID, { ...props }));

  return (
    <>
      <svg id={svgID} />
    </>
  );
}

const renderChart = (props) => {
  // will refactor with prop types
  const {
    graphFillColor = '#f38200',
    xAxisFeature = 'Time',
    yAxisFeature = 'VSBenchmark',
    data = vsBenchmarkStats,
    width = 320,
    height = 500,
  } = { ...props };

  const series = d3
    .stack()
    .keys(Object.keys(data[0]))
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut)(data);

  const area = d3
    .area()
    .x((d) => x(d.data[xAxisFeature]))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  const margin = { top: 0, right: 20, bottom: 30, left: 20 };

  // .append("title")
  // .text(({key}) => key);

  // svg.append('g');
  // .call(xAxis);

  // const xAxis = (g) =>
  //   g
  //     .attr('transform', `translate(0,${height - margin.bottom})`)
  //     .call(
  //       d3
  //         .axisBottom(x)
  //         .ticks(width / 80)
  //         .tickSizeOuter(0)
  //     )
  //     .call((g) => g.select('.domain').remove());

  const minXScale = data.reduce(
    (minXScale, sample) => (minXScale < sample[xAxisFeature] ? minXScale : sample[xAxisFeature]),
    Infinity
  );

  const maxXScale = data.reduce(
    (maxXScale, sample) => (maxXScale > sample[xAxisFeature] ? maxXScale : sample[xAxisFeature]),
    -Infinity
  );

  const x = d3
    .scaleLinear()
    .domain([minXScale, maxXScale])
    .range([margin.left, width - margin.right]);

  const minDataVal = data.reduce(
    (minDataVal, sample) => (minDataVal < sample[yAxisFeature] ? minDataVal : sample[yAxisFeature]),
    Infinity
  );

  const maxDataVal = data.reduce(
    (maxDataVal, sample) => (maxDataVal > sample[yAxisFeature] ? minDataVal : sample[yAxisFeature]),
    -Infinity
  );

  const y = d3
    .scaleLinear()
    .domain([minDataVal, maxDataVal])
    .range([height - margin.bottom, margin.top]);

  const color = d3
    .scaleOrdinal()
    .domain(Object.keys(data[0]))
    .range(d3.schemeCategory10)
    // .range(['#f38200', '#50c369']);
    .range(['#fff', graphFillColor]);

  const svg = d3.select(svgID).create('svg').attr('viewBox', [0, 0, width, height]);

  svg
    .append('g')
    .selectAll('path')
    .data(series)
    .join('path')
    .attr('fill', ({ key }) => color(key))
    .attr('d', area);

  return svg;
};