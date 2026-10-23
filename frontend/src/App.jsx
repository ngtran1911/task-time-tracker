import {BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


import Dashboard from './pages/Dashboard'
import Report from './pages/Report'
import Timetracker from './pages/Timetracker'


function App() {
  return(
    <div>
      <header>
        <h2>mimi.tracking</h2>
        
        <div className='nav'>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="report">Report</NavLink>
          <NavLink to="Timetracker">Timetracker</NavLink>
        </div>
        
      </header>


      <main>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='report' element={<Report/>}></Route>
          <Route path='Timetracker' element={<Timetracker/>}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
