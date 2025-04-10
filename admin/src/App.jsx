import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetReservation from './components/GetReservations'
import AddReservation from './components/AddReservation'
// import AddEmployer from './components/AddEmployer'
import AddService from './components/AddService'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import VerifyEmail from './components/VerifyEmail'
import NavMenu from './components/NavMenu'
import Profile from './components/Profile'

function App() {
  const tokenData = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {tokenData ? <NavMenu /> : null}
      <Routes>
        <Route path="/reservations" element={<GetReservation />} />
        <Route path="/add-reservation" element={<AddReservation />} />
        {/* <Route path="/addEmployer" element={<AddEmployer />} /> */}
        <Route path="/service" element={<AddService />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify/:id" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
