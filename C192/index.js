import React from 'react';
import ReactDOM from 'react-dom';
import { Cartography } from './Cartography';
import { useData } from './useData';

const App = () => {
  const data = useData();
  return <Cartography data={data}/>
}

ReactDOM.render(<App />, document.getElementById('root'));
