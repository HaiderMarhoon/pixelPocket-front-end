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
import SearchBar from './components/searchBarHome.js/searchBar.jsx'

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
    const fetchFavorites = async () => {
      if(user) {
        try {
          const fav = await favoriteService.getFavorite(user._id)
          setFavorite(fav)
        } catch (err) {
          console.error("Failed to fetch favorites:", err)
          setFavorite([])
        }
      } else {
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
  const handleUpdateGame = async (formData, gamesId) =>{
    try{
      const updateGame = await gameService.update(formData, gameId)
      setGames(games.map(g => g._id === gameId ? updateGame : g))
      navigate(`/games/${gameId}`)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeleteGame = async (gamesId) => {
      try {
          await gameService.deleteGame(gamesId);
          setGames(games.filter(game => game._id !== gamesId));
          navigate('/games');
      } catch (err) {
          console.log('Failed to delete game:', err);
      }
  };
  
  const handleAddFavorite = async (gamesId) => {
    try {
      const updatedFavorites = await favoriteService.addFavorite(user._id, gamesId);
      setFavorite(updatedFavorites);
    } catch (err) {
      console.error('Failed to add favorite:', err);
    }
  };

  const handleRemoveFavorite = async (gamesId) => {
    try {
      const updatedFavorites = await favoriteService.removeFavorite(user._id, gamesId);
      setFavorite(updatedFavorites);
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

    const handleSearch = (query) => {
    console.log('Searching for:', query);
  };


  return (
    
    <>

      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path='/games/new' element={<GameForm handleAddGame={handleAddGame} />} />
        <Route path="/games/:gamesId/edit" element={<GameForm handleUpdateGame={handleUpdateGame} />} />
        <Route path="/games" element={<GameList games={games} />} />


        <Route path="/users/:userId/favorite" element={<GameFavorite favorite={favorite} handleRemoveFavorite={handleRemoveFavorite} />} />
        <Route path="/games/:gamesId" element={<GameDetails user={user} games={games} favorite={favorite} handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleAddFavorite} handleDeleteGame={handleDeleteGame} />} />


        <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
        <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
        <Route path='/' element={<HomePage  />} />
        <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>


  )
}

export default App