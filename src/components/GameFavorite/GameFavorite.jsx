import { Link } from 'react-router-dom'


const GameFavorite = ({ favorite, handleRemoveFavorite }) => {
  if (!favorite) return <p>Loading favorites...</p>;
  
  return (
    <main>
      <h1>Favorite Games</h1>
      {favorite.length === 0 ? (
        <p>No favorite games yet.</p>
      ) : (
        favorite.map((game) => (
          <div key={game._id} className="game-card"> {/* Key prop added here */}
            <Link to={`/games/${game._id}`}>
              <article>  
                <header>
                  <h2>{game.title}</h2>
                  {game.author && (
                    <p>By {game.author.username}</p>
                  )}
                </header>
                {game.image && <img src={game.image} alt={game.title} />}
                <p>{game.body}</p>
              </article>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFavorite(game._id);
              }}
            >
              Remove Favorite
            </button>
          </div>
        ))
      )}
    </main>
  )
}


export default GameFavorite