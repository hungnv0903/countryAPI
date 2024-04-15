import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countrySlice from "../slices/countrySlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/rootSaga";


const sagaMiddleware = createSagaMiddleware() ; 

const rootReducer = combineReducers({
    countrySlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga) ;
 
export type RootState = ReturnType<typeof store.getState> ; 