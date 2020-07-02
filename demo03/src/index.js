import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'zent';
import iconWebpack from './assets/webpack.png';
import './index.scss';

const App = () => (
  <div className="container">
    <p>Hello Webpack!</p>
    <img src={iconWebpack} />
    <Button type="primary">Hello Zent!</Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
