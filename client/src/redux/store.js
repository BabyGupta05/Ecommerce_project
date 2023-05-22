import {legacy_createStore as createStore,applyMiddleware,combineReducers} from "redux"
import thunk from "redux-thunk"
import authReducer  from "./auth/reducer"

let combinedReducers = combineReducers({
    authReducer
})

let store = createStore(combinedReducers,applyMiddleware(thunk))

store.subscribe(()=>{
    console.log("Store.js",store.getState())
})

export {store}