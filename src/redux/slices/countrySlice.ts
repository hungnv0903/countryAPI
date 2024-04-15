import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ICountry } from "../../types/models";

interface IInitialState {
    loadding:boolean ; 
    listCountry: ICountry [] ; 
    error:string ; 
}

const initialState:IInitialState = {
    loadding:false,
    listCountry:[],
    error:""
}

const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        handleCountryFetchRequest(state){
            state.loadding = false ; 
        },

        handleCountryFetchSuccess(state,action:PayloadAction<ICountry[]>){
            state.loadding = true ;  
            state.listCountry = action.payload ;
        },

        handleCountryFetchFailed(state){
            state.loadding = false ; 
            state.error = "call fail" ; 
        }

    }
})

export const {handleCountryFetchRequest,handleCountryFetchSuccess,handleCountryFetchFailed} = countrySlice.actions ; 
export default countrySlice.reducer ; 