import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Flex, Form, Input, Row} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TableContext } from './TableComponent';
import { filterArea, searchCountry } from '../utils/country';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { ICountry } from '../types/models';

export interface IFilterValue {
  start:number ; 
  end:number ; 
}

const SearchComponent = () => {
    const data = useSelector((state:RootState)=>state.countrySlice.listCountry) ; 
    const {listCountry , setListCountry} = useContext(TableContext) ; 
    const [filterValue , setFilterValue] = useState<IFilterValue>({start:0,end:0})
    const [searchText , setSearchText] = useState<string>('') ; 
    const [listFilterCountry , setListFilterCountry] = useState<ICountry[]>([]) ; 

    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(event.target.value.toLowerCase()) ; 
    }

    useEffect(()=>{
      if(filterValue.start!==0 && filterValue.end!==0){
        if(searchText!==""){
          const newListCountry = searchCountry(listCountry,searchText) ; 
          setListCountry(newListCountry) ; 
        }else{
          setListCountry(listFilterCountry) ; 
        }  
      }else{
        if(searchText!==""){
          const newListCountry = searchCountry(data,searchText) ; 
          setListCountry(newListCountry) ; 
        }else{
          setListCountry(data) ; 
        }
      }
    },[searchText])


   const handleOnFinish = (value:any)=>{
      if(value.start!==undefined && value.end!==undefined && value.start!=='' && value.end!==''){
        const fValue = {start:parseInt(value.start),end:parseInt(value.end)} ;
        setFilterValue(fValue) ;  
        if(fValue.start<filterValue.start || fValue.end<filterValue.start || 
          fValue.start>filterValue.end || 
          fValue.end>filterValue.end){
            const newListCountry = filterArea(data,fValue) ; 
            setListCountry(newListCountry) ; 
            setListFilterCountry(newListCountry) ; 
          }else{
            const newListCountry = filterArea(listCountry,fValue) ; 
            setListCountry(newListCountry) ; 
            setListFilterCountry(newListCountry) ; 
          }
      }
   }

  return (
    <div>
       <Row className='mb-2 d-flex justify-content-between flex-column'>
        <Col span={12}>
        <Flex vertical gap={24}>
          <Input placeholder="Search for country name" prefix={<SearchOutlined />} onChange={handleSearch} />
        </Flex>
        </Col>
        <Col span={12} className='mt-2'>
          <Form onFinish={handleOnFinish}  className='d-lg-flex align-items-center '>
          <Form.Item className='me-lg-2' name="start" rules={[{ required: true, message: 'Start is required!' }]}>
              <Input placeholder='Start' />
          </Form.Item>
            <Form.Item className='me-lg-2' name="end" rules={[{ required: true, message: 'End is required!' }]}>
              <Input placeholder='End' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'>Filter Area</Button>
          </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default SearchComponent
