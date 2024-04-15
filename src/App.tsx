import { Fragment, Suspense, useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { handleCountryFetchRequest } from './redux/slices/countrySlice';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Country from './pages/Country';

function App() {
  const dispatch = useDispatch() ; 
  useEffect(()=>{
    dispatch(handleCountryFetchRequest()) ; 
  },[])

  return (
    <Fragment>
      <Suspense>
        <NavLink to={"/countryAPI"}></NavLink>
        <main>
          <Routes>
              <Route path='/countryAPI' element={<Country></Country>}></Route>
          </Routes>
        </main>
      </Suspense>
    </Fragment>
  )
}

export default App
