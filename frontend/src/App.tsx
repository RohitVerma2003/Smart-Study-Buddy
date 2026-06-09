import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import SignUp from "./pages/authentication/SignUp"
import Login from "./pages/authentication/Login"
import Protected from "./utils/Protected"
import Home from "./pages/layout/Home"
import Dashboard from "./pages/layout/Dashboard"
import AppLayout from "./pages/layout/AppLayout"
import Documents from "./pages/layout/Documents"
import Canvas from "./pages/layout/Canvas"
import Chat from "./pages/layout/Chat"

const App = () => {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route element={
          <Protected>
            <AppLayout />
          </Protected>
        }>
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/documents" element={<Protected><Documents /></Protected>} />
          <Route path="/canvas" element={<Protected><Canvas /></Protected>} />
          <Route path="/chat/:documentId" element={<Protected><Chat /></Protected>} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App