import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Index from './Components/Index/index';
import Post from './Components/Post';
import Three from './Components/Three';
import Three2 from './Components/Three2';
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
            <li><NavLink to="/three">Three</NavLink></li>
            <li><NavLink to="/three2">Three 2</NavLink></li>

            {/* <li><NavLink to="/alg">Alg</NavLink></li> */}
          </ul>
        </nav>
        <Route exact={true} path="/post" component={Post}/>
        <Route exact={true} path="/three" component={Three}/>
        <Route exact={true} path="/three2" component={Three2}/>
        {/* <Route exact={true} path="/ts" component={TS}/> */}
        {/* <Route exact={true} path="/alg" component={Alg}/> */}
        <Route exact={true} path="/" component={Index}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
