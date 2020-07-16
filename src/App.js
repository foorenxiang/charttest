import React from 'react';
import './App.css';
import StreamGraphComponent from './StreamgraphComponent';

function App() {
  const props = {
    graphFillColor: '#f38200',
    xAxisFeature: 'Time',
    yAxisFeaturE: 'VSBenchmark',
    data: 'vsBenchmarkStats',
    width: 320,
    height: 500,
  };
  return (
    <>
      <StreamGraphComponent {...props} />
    </>
  );
}

export default App;
