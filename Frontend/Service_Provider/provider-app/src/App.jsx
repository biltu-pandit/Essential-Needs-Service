import { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import Dashboard from './Dashboard';
import Add from './Add';
import Profile from './Profile';
import BookingRequest from './BookingRequest';
import Manage from './Manage';
import Login from './Login';
import Register from './Register';
import EditService from './EditService';
import BookingRequestByServiceName from './BookingRequestByServiceName';


function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag]= useState(0)

  useEffect(()=>{
     if(localStorage.getItem("email"))
      setFlag(1)
  },[])

  return (
    <>
 <Router>
   <div className="container-scroller">
  {/* partial:../../partials/_sidebar.html */}
  {
    flag==0 ? <></> :<Sidebar></Sidebar>
  }
  {/* partial */}
  <div className="container-fluid page-body-wrapper">
    {/* partial:../../partials/_navbar.html */}
    {flag == 0 ? <></>:<Navbar></Navbar>}
    {/* partial */}
    <div className="main-panel">
      <div className="content-wrapper">
        {/* Blank Start  */}
        <Routes>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/add' element={<Add></Add>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/bookingRequest' element={<BookingRequest></BookingRequest>}></Route>
          <Route path='/manage' element={<Manage></Manage>}></Route>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/edit_service' element={<EditService></EditService>}></Route>
          <Route path='/bookingRequestByService' element={<BookingRequestByServiceName></BookingRequestByServiceName>}></Route>
        </Routes>
        {/* Blank End  */}
      </div>
      {/* content-wrapper ends */}
      {/* partial:../../partials/_footer.html */}
      {
        flag==0 ?<></> :<Footer></Footer>
      }
      {/* partial */}
    </div>
    {/* main-panel ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>
 </Router>
    </>
  )
}

export default App
