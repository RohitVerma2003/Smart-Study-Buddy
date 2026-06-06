import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import SignUp from "./pages/authentication/SignUp"
import Login from "./pages/authentication/Login"
import Protected from "./utils/Protected"
import Home from "./pages/layout/Home"

const App = () => {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App