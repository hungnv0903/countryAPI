import dayjs from "dayjs";
import { ICountry } from "../types/models";
import { IFilterValue } from "../components/SearchComponent";

export const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getTimeZone = (utc:string)=>{
   const utcNumber = parseInt(utc.replace('UTC','')) ; //tách lấy số utc
   const currentTime = dayjs() ; //lay thoi gian hien tai o mui gio utc
   const countryTime = currentTime.add(utcNumber,'hour') ; // lấy thời gian theo quốc gia.
   const formatTime = utc==="UTC"?currentTime.format('DD-MM-YYYY HH:mm'):countryTime.format('DD-MM-YYYY HH:mm') ; 
   return formatTime ; 

}

export const searchCountry = (arr:ICountry[] , value:string)=>{
    return arr.filter((item)=>item.name.common.toLowerCase().includes(value.toLowerCase())).
            sort((a,b)=>a.name.common.localeCompare(b.name.common)) ; 
}
//phương thức localeCompare để so sánh chuỗi dựa trên thứ tự từ điển (alphabetic order) trong JavaScript.

export const convertArrArea = (arr:ICountry[])=>{
    return arr.map((item)=>item.area) ; 
}

const sortArea = (a:ICountry,b:ICountry)=>{
    return (a.area-b.area) ; 
}

export const filterArea = (arr:ICountry[] , filterValue:IFilterValue) =>{
    return arr.filter((item)=>item.area>=filterValue.start && item.area<=filterValue.end).sort(sortArea); 
}


