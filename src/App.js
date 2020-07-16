import React from 'react';
import './App.css';
import StreamGraphComponent from './StreamgraphComponent';
import vsBenchmarkStats from './vsBenchmark';

function App() {
  const props = {
    graphFillColor: '#f38200',
    xAxisFeature: 'Time',
    yAxisFeaturE: 'VSBenchmark',
    data: vsBenchmarkStats,
    height: 200,
    width: 320,
  };
  return (
    <>
      <StreamGraphComponent {...props} />
    </>
  );
}

export default App;
