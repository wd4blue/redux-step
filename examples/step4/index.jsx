import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { bindActionCreators, createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import Counter from 'components/counter';
import * as counterAction from 'actions/counter.js';
import counterReducer from 'reducers/counter';

//applyMiddleWare way 1
//const store = createStore(counterReducer, 8, applyMiddleware(thunk));

//applyMiddleWare way 2
//const enhanceCreateStore = applyMiddleware(promiseMiddleware, warningMiddleware, ...)(createStore)
const logger = createLogger();
let enhanceCreateStore = applyMiddleware(thunk, logger)(createStore);
const store = enhanceCreateStore(counterReducer, 8);

let incActionCreators = bindActionCreators(counterAction.incActionCreator, store.dispatch);
let asyncIncActionCreators = bindActionCreators(counterAction.asyncIncActionCreator, store.dispatch);

function render() {
  ReactDOM.render(
    <Counter
        value={store.getState()}
        onIncrement={() => incActionCreators(3)}
        onAsyncIncrement={() => asyncIncActionCreators(2)}
        onDecrement={() => store.dispatch(counterAction.decActionCreator(3))}
        onAsyncDecrement={() => store.dispatch(counterAction.asyncDecActionCreator(2))}
    />,
    document.getElementById('app')
  )
}

//组件渲染
store.subscribe(render);
render();

