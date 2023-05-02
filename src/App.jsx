import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Playlist from "./components/Playlist"
import Profile from "./components/Profile"
import Reset from "./components/Reset"
import Settings from "./components/Settings"
import PrivateRoutes from './PrivateRoutes'
import {Routes, Route} from 'react-router-dom'
import UserContextProvider from './UserContextProvider'

function App() {

  return (
    <div className="App">
      <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="login" element={<Login />}/>
          <Route path="reset" element={<Reset />}/>
          <Route element={<PrivateRoutes/>}>
            <Route path='Dashboard' element={<Dashboard />}/>
            <Route path='Library' element={<Playlist/>}/>
            <Route path='Profile' element={<Profile />}/>
            <Route path='Settings' element={<Settings />}/>
          </Route> 
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
