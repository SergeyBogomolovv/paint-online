import { Route, Routes } from 'react-router'
import MainPage from './pages/main'
import EnterPage from './pages/enter'

function App() {
  return (
    <Routes>
      <Route path='/:id' element={<MainPage />} />
      <Route path='/' element={<EnterPage />} />
    </Routes>
  )
}

export default App
