import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import GameForm from './components/GameForm/GameForm'
import GameList from './components/GameList/GameList'
import GameDetails from './components/GameDetails/GameDetails'
import HomePage from './components/homePage/homePage'

// add plase


import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as gameService from './services/gameService'
import * as favoriteService from './services/favoriteService'
import { useState , useEffect } from 'react'
import GameFavorite from './components/GameFavorite/GameFavorite.jsx'

const App = () => {

  const navigate = useNavigate()
  
  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [games , setGames] = useState([])
  const [favorite, setFavorite] = useState([])

  useEffect(()=>{
    const fetchAllGame = async () =>{
      const gameData = await gameService.index()
      setGames(gameData)
    }
    fetchAllGame()
  },[])

  useEffect(() => {
    const fetchFavorites = async (gameId) => {
      if(user){
        const fav = await favoriteService.getFavorite(user._id, gameId)
        setFavorite(fav)
      }else{
        setFavorite([])
      }
    }
    fetchFavorites()
  }, [user])

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

  const handleAddGame = async (formData) => {
      try {
          const newGame = await gameService.create(formData);
          setGames([...games, newGame]);
      } catch (err) {
          console.error('Failed to add game:', err);
      }
  };
  const handleUpdateGame = async (formData, gameId) =>{
    try{
      const updateGame = await gameService.update(formData, gameId)
      navigate(`/games/${gameId}`)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeleteGame = async(gameId) =>{
    try{
      await gameService.deleteGame(gameId)
      setGames(games.filter(game => game._id !== gameId))
      navigate('/games')
    }
    catch(err){
      console.log(err)
    }
  }
  const handleAddFavorite = async (gameId) => {
    const updated = await favoriteService.addFavorite(user._id, gameId)
    setFavorite(updated)
  }
  const handleRemoveFavorite = async (gameId) => {
    const updated = await favoriteService.removeFavorite(user._id, gameId)
    setFavorite(updated)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/games/new' element={<GameForm handleAddGame={handleAddGame} />} />
        <Route path="/games/:gamesId/edit" element={<GameForm handleUpdateGame={handleUpdateGame} />} />
        <Route path="/games" element={<GameList games={games} />} />

        <Route path="/user/:userId/favorite" element={<GameFavorite favorite={favorite} handleRemoveFavorite={handleRemoveFavorite} />} />
        <Route path="/games/:gamesId" element={<GameDetails user={user} games={games} favorite={favorite} handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleAddFavorite} />} />

        <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
        <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
        <Route path='/' element={<HomePage  />} />
        <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>


  )
}

export default App