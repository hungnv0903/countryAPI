import request from "../api/configApi"

export const getCountryApi = async()=>{
    try {
        const response = await request.get("v3.1/all") ; 
        return response ; 
    } catch (error) {
        throw error ; 
    }
}