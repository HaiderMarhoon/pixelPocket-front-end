import { Link } from 'react-router-dom'

const GameFavorite = ({ favorite , handleRemoveFavorite }) => {

  return (
    <main>
      <h1>Game Favorite</h1>
      {(!favorite || favorite.length === 0) && <p>No favorite games yet.</p>}
      {favorite && favorite.map((game) => (
        <Link key={game._id} to={`/games/${game._id}`}>
          <article>  
            <header>
            <h2>{game.title}</h2>
            <p>
              {game.author.username} posted on {new Date(game.createdAt).toLocaleDateString()}
            </p>
            </header>
            <p>{game.text}</p>
            <p>{game.image}</p>     
          </article>
          <button onClick={() => handleRemoveFavorite(game._id)}> </button>
        </Link>
      ))}
    </main>
  )
}

export default GameFavorite