import { Link } from 'react-router-dom'

const GameFavorite = (props) => {

  return (
    <main>
      <h1>Game Favorite</h1>
      {props.user &&
      props.games.map((game) => (
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
        </Link>
      ))}
    </main>
  )
}

export default GameFavorite