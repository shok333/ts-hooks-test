import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Index from './Components/Index/index';
import Post from './Components/Post';
// import TS from './Components/TS/index';
// import Alg from './Components/Alg';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav className="navigation">
          <ul>
            <li><NavLink to="/">Главная</NavLink></li>
            {/* <li><NavLink to="/ts">TS</NavLink></li> */}
            <li><NavLink to="/post">Пост</NavLink></li>
            {/* <li><NavLink to="/alg">Alg</NavLink></li> */}
          </ul>
        </nav>
        <Route exact={true} path="/post" component={Post}/>
        {/* <Route exact={true} path="/ts" component={TS}/> */}
        {/* <Route exact={true} path="/alg" component={Alg}/> */}
        <Route exact={true} path="/" component={Index}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
