import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Playlist from "./components/Playlist"
import Profile from "./components/Profile"
import PrivateRoutes from './PrivateRoutes'
import {Routes, Route} from 'react-router-dom'
import UserContextProvider from './UserContextProvider'

function App() {

  return (
    <div className="App">
      <UserContextProvider>
      <Home />
      <Routes>
        <Route path='/'>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<Login />}/>
        </Route>
        
        <Route element={<PrivateRoutes/>}>
          <Route path='Dashboard' element={<Dashboard />}/>
          <Route path='Library' element={<Playlist/>}/>
          <Route path='Profile' element={<Profile />}/>
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
