import { Navigate, Route, Routes } from 'react-router'
import Canvas from './components/canvas'
import Settings from './components/settings'
import Toolbar from './components/toolbar'

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/:id'
          element={
            <>
              <Toolbar />
              <Settings />
              <Canvas />
            </>
          }
        />
        <Route path='/' element={<Navigate to={`/f${+new Date()}`} />} />
      </Routes>
    </div>
  )
}

export default App
