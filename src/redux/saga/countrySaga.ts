import { call, put, takeLatest } from "redux-saga/effects";
import { getCountryApi } from "../../services/countryApiService";
import { handleCountryFetchFailed, handleCountryFetchRequest, handleCountryFetchSuccess } from "../slices/countrySlice";
import { ICountry } from "../../types/models";



function* fetchCountry(){
    try {
        const response:ICountry[] = yield call(()=>getCountryApi()) ;
        yield put(handleCountryFetchSuccess(response)) 

    } catch (error) {
        put(handleCountryFetchFailed()) ; 
    }
}

function* countrySaga(){
    yield takeLatest(handleCountryFetchRequest,fetchCountry) ;
}

export default countrySaga ; 