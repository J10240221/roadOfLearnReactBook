import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

//添加热替换(HMR)实现页面不刷新，但也会替换
if(module.hot){
  module.hot.accept();
}
registerServiceWorker();
