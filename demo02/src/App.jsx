import React, { useEffect } from 'react';
import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  Button,
  Icon,
} from 'zent';
import iconWebpack from './assets/webpack.png';
import './App.scss';

const App = () => {
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        document.title = 'Hello World!';
        resolve();
      }, 5000);
    });
  }, []);

  return (
    <Grid>
      <Row>
        <Col span={24}>
          <img className="icon" src={iconWebpack} />
          <Button type="primary">
            <Icon type="youzan" />
            Hello Zent!
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};

export default App;
