import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
   reducer,
   compose(applyMiddleware(thunk),
   typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? //para que funcione en vangeadore que no tienen redux devtools o en incognito
   window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f
   )
);

export default store;