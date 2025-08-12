import { Link } from 'react-router-dom'

const GameList = (props) => {

  return (
    <main>
      <h1>Game List</h1>
      {props.games.map((game) => (
        <Link key={game._id} to={`/games/${game._id}`}>
          <article>  
            <header>
            <h2>{game.title}</h2>
            </header>
            <p>{game.text}</p>
            <img src={game.image} alt={game.title} />
          </article>
        </Link>
      ))}
    </main>
  )
}

export default GameList