import React from 'react';
import ReactDOM from 'react-dom';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import './index.css';
import dva from './utils/dva';
import models from './models/index';
import Router from './route/route'
import env from './config/env';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

env.set();
let options = {
  models,
  ...createLoading({ effects: true }),
  onAction: [],
  // onError: handleError,
};
if (process.env.NODE_ENV === 'development') {
  options = {
    ...options,
    onAction: options.onAction.concat(createLogger()),
  };
}
const app = dva(options);
const App = app.start(<Router />);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
