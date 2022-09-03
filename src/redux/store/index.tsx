import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';
import reducers from 'src/redux/reducers';

let middleware = [thunkMiddleware.default];

const store: any = createStore(reducers, applyMiddleware(...middleware));

const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export {store, persister};