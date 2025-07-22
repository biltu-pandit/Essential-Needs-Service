import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import App from './App.jsx'
import Index from './Index.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Bookings from './Bookings.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Login></Login> */}
    {/* <Home></Home> */}
    {/* <About></About> */}
    {/* <Bookings></Bookings> */}
    {/* <Electrician></Electrician> */}
    {/* <Doctor></Doctor> */}
    {/* <Plumber></Plumber> */}
    {/* <AcCleaning></AcCleaning> */}
  </StrictMode>,
)
