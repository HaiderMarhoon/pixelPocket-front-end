import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import GameForm from './components/GameForm/GameForm'
import GameLst from './components/GameList/GameList'

import { Route, Routes } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as gameService from './services/gameService'
import { useState , useEffect } from 'react'

const App = () => {
  
  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)

  const [games , setGames] = useState([])

  useEffect(()=>{
    const fetchAllGame = async () =>{
      const gameData = await gameService.index()
      setGames(gameData)
    }
    fetchAllGame()
  },[])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch(err){

      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  const handleAddGame = async (formData) =>{
    await gameService.create(formData)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/games/new' element={<GameForm handleAddGame={handleAddGame} />}/>
        <Route path="/games" element={<GameList games={games} />} />
        <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
        <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
        <Route path='/' element={<h1>Hello world!</h1>} />
        <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>

    // <>
    //   <NavBar user={user} handleSignOut={handleSignOut} />
    //   <Routes>
    //     <Route path="/" element={<h1>Hello World!</h1>} />
    //     {!user && (
    //       <>
    //         <Route
    //           path="/sign-up"
    //           element={<SignUp handleSignUp={handleSignUp} />}
    //         />
    //         <Route
    //           path="/sign-in"
    //           element={<SignIn handleSignIn={handleSignIn} />}
    //         />
    //       </>
    //     )}
    //     <Route path="*" element={<h1>404</h1>} />
    //   </Routes>
    // </>
  )
}

export default App