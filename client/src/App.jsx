import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import Header from './components/Header'
import ProfilePage from './pages/profile'
import CreateListingPage from './pages/create-listing'
import HomePage from './pages/home'
import ProtectedPage from './components/ProtectedPage'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'
import PropertyPage from './pages/property/index';
import SearchPage from './pages/search'
import EditListingPage from './pages/edit-listing'
import ChangePasswordPage from './pages/change-password'
const App = () => {
  const {loading}=useSelector(state=>state.loading)
  
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
           <Route path='/' element={<HomePage/>} />
          <Route path='/sign-in' element={<SignInPage/>} />
          <Route path='/sign-up' element={<SignUpPage/>} />
          <Route path='/profile' element={<ProtectedPage><ProfilePage/></ProtectedPage>} />
          <Route path='/change-password' element={<ProtectedPage><ChangePasswordPage/></ProtectedPage>} />

          <Route path='/create-listing' element={<ProtectedPage><CreateListingPage/></ProtectedPage>} />
          <Route path='/edit-listing/:listingId' element={<ProtectedPage><EditListingPage/></ProtectedPage>} />

          <Route path='/properties/:propertyId' element={<PropertyPage/>} />
          <Route path='/search' element={<SearchPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
