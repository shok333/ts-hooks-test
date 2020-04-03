import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducer as indexReducer} from './Components/Index/reducer';

export default createStore(
  combineReducers({
    index: indexReducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
);;