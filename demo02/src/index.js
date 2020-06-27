import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import iconWebpack from './assets/webpack.png';
import './index.less';

const App = () => (
  <div className="container">
    <p>Hello Webpack!</p>
    <img src={iconWebpack} />
    <Button type="primary">Hello Ant Design!</Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
