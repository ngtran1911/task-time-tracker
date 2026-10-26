import {BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


import Dashboard from './pages/Dashboard'
import Report from './pages/Report'
import Timetracker from './pages/Timetracker'
import Info from './pages/Info';


function App() {
  return(
    <div>
      <header>
        <h2>mimi.tracking</h2>
        
        <div className='nav'>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="report">Report</NavLink>
          <NavLink to="Timetracker">Timetracker</NavLink>
          <NavLink to="/info">Info</NavLink>
        </div>
        
      </header>


      <main>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='report' element={<Report/>}></Route>
          <Route path='Timetracker' element={<Timetracker/>}></Route>
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
