import { all } from "redux-saga/effects";
import countrySaga from "./countrySaga";


export default function* rootSaga(){
    yield all([
        countrySaga(),
    ])
}