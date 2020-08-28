import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'zent';
import iconWebpack from './assets/webpack.png';
import './index.scss';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      document.title = 'Hello World!';
    }, 5000);
  }, []);

  return (
    <div className="container">
      <p>Hello Webpack!</p>
      <img src={iconWebpack} alt="icon-webpack" />
      <Button type="primary">
        <Icon type="youzan" />
        Hello Zent!
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
