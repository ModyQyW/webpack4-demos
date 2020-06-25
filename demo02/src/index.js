import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.less';

const App = () => (
  <div class="container">
    <p>Hello Webpack!</p>
    <Button type="primary">Hello Ant Design!</Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
