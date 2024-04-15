import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Table, TableColumnsType, TablePaginationConfig} from 'antd';
import { formatNumber, getTimeZone } from '../utils/country';
import { createContext, useEffect, useState } from 'react';
import { ICountry } from '../types/models';
import SearchComponent from './SearchComponent';

interface DataType {
  key: string,
  Name:string,
  Capital:string,
  Population:string,
  Flags:string,
  Area:string,
  Time:string,
}



export const TableContext = createContext<{listCountry:ICountry[] ; 
  setListCountry:React.Dispatch<React.SetStateAction<ICountry[]>>}>({
    listCountry:[],
    setListCountry:()=>{}
  }) ; 

const TableComponent = () => {
    const data = useSelector((state:RootState)=>state.countrySlice.listCountry) ; 
    const [listCountry , setListCountry] = useState<ICountry[]>([]) ; 
    const [currentPage , setCurentPage] = useState<number>(1) ; 
    const [pageSize , setPageSize] = useState<number>(0) ; 
    const [keyTable , setKeyTable] = useState<number>(0) ; 
    
    useEffect(()=>{
      setListCountry(data) ; 
    },[data])

    const Field = ["Index","Flags","Name","Capital","Population","Area","Time"]
    const columns:TableColumnsType<DataType> = Field.map((item)=>(
      {   
          title:item==="Index"?"#":item,
          dataIndex:item,
          key:item,
          align:'center',
          render:item==="Flags"?((url:string)=>
            <img src={url} alt="flag" style={{width:'50px',height:'auto'}} />):
            item==="Index"?(_text, _record, index) =>index + 1 + (currentPage-1)*pageSize:undefined,
            sorter:item==="Population"?(a,b)=>
            parseInt(a[item].replace(/,/g,''))-parseInt(b[item].replace(/,/g,'')):undefined
          
      }
    ))
 
    const dataSource = listCountry.map((item,_index)=>(
           {
                key:item.name.common,
                Name:item.name.common,
                Capital:item.capital?item.capital[0]:'',
                Population:formatNumber(item.population),
                Flags:item.flags.png,
                Area:formatNumber(item.area),
                Time:getTimeZone(item.timezones[0]),
            }
        ))
    
    const handleTableChange = (pagination:TablePaginationConfig,_filters:any,_sorter:any,_extra:any)=>{
      if(pagination.current && pagination.pageSize){
        setCurentPage(pagination.current)
        setPageSize(pagination.pageSize)
      } 
    }
    useEffect(()=>{
      setKeyTable(keyTable+1) ; 
      if(listCountry.length<pageSize){
        setPageSize(listCountry.length) ; 
        setCurentPage(1) ; 
      }else{
        setCurentPage(1)
        setPageSize(0)
      }

    },[listCountry])
   

  return (
    <TableContext.Provider value={{listCountry,setListCountry}}>
     <SearchComponent />
      <Table dataSource={dataSource} columns={columns} 
        bordered={true}
        pagination={{position:['bottomCenter']}}
        onChange={handleTableChange}
        key={keyTable}
      ></Table>
    </TableContext.Provider>
  )
}

export default TableComponent

// khi sử dụng phương thức render trong ant Design, Ant Design sẽ tự động truyền giá trị của trường
      // dữ liệu tương ứng thông qua tham số của render
      // khi không có render thì giá trị hiển thị mặc định là giá trị của trường dữ liệu
      // nhưng khi có render (là một arrowfuc tuỳ chỉnh) nó sẽ ưu tiên hiển thị kết quả của hàm
