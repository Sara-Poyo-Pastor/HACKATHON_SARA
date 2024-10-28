import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Registration from '../pages/Registration/Registration'
import Principal from '../pages/Principal/Principal';
import PrivacyTerms from '../pages/PrivacyTerms/PrivacyTerms'



const RouterItem = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/:user?' element={<Home/>}></Route>
                <Route path='/Registration' element={<Registration/>}></Route>
                <Route path='/Principal' element={<Principal/>}></Route>
                <Route path='/PrivacyTerms' element={<PrivacyTerms/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterItem;