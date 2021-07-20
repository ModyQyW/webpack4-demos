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
    setTimeout(() => {
      document.title = 'Hello World!';
      console.log(
        'process.env',
        process.env,
        process.env.NODE_ENV,
        process.env.APP_MODE,
      );
    }, 5000);
  }, []);

  return (
    <Grid>
      <Row>
        <Col span={24}>
          <img alt="webpack" className="icon" src={iconWebpack} />
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
