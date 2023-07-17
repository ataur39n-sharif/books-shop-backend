import { Container } from 'react-bootstrap'
import './App.css'
import NavBar from './Components/Navbar'
import Login from './Components/Auth/singin'
import Books from './Components/Books'

function App() {
  return (
    <>
      <NavBar />
      {/* <Login/> */}
      <div>
        <Books />
      </div>
    </>
  )
}

export default App
