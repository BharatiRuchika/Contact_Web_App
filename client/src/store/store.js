import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userReducer,useDetailsReducer} from '../reducer/userReducer'
const middleware = [thunk];
const reducer = combineReducers({
    auth:userReducer,
    user:useDetailsReducer
})
const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))
export default store;