import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Login from '../pages/Login/Login'
// // import AudioProcess from '../pages/AudioProcess/AudioProcess'
// import History from '../pages/History/History'
import Home from '../pages/Home/Home'
// import LabelResults from '../pages/LabelResults/LabelResults'
import Registration from '../pages/Registration/Registration'
import Principal from '../pages/Principal/Principal';
import PrivacyTerms from '../pages/PrivacyTerms/PrivacyTerms'



const RouterItem = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                <Route path='/Login' element={<Login/>}></Route>
                {/* <Route path='/AudioProcess' element={<AudioProcess/>}></Route> */}
                {/* <Route path='/History' element={<History/>}></Route> */}
                <Route path='/:user?' element={<Home/>}></Route>
                {/* <Route path='/LabelResults' element={<LabelResults/>}></Route> */}
                {/* <Route path='/LabelResults/:audioId' element={<LabelResults />} /> */}
                <Route path='/Registration' element={<Registration/>}></Route>
                <Route path='/Principal' element={<Principal/>}></Route>
                <Route path='/PrivacyTerms' element={<PrivacyTerms/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterItem;