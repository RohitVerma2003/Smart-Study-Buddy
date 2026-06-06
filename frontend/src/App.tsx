import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello</div>} />
    </Routes>
  )
}

export default App