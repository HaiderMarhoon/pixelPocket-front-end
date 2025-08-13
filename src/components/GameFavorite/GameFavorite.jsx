import { Link } from 'react-router-dom'

const GameFavorite = ({ favorite, handleRemoveFavorite }) => {
  if (favorite === undefined) return <p>Loading favorite...</p>;

  return (
    <main>
      <h1>Favorite Game</h1>
      {!favorite ? (
        <p>No favorite game yet.</p>
      ) : (
        <div className="game-card">
          <Link to={`/games/${favorite._id}`}>
            <article>
              <header>
                <h2>{favorite.title}</h2>
                {favorite.author && (
                  <p>By {favorite.author.username}</p>
                )}
              </header>
              {favorite.image && <img src={favorite.image} alt={favorite.title} />}
              <p>{favorite.body}</p>
            </article>
          </Link>
          <button
            onClick={e => {
              e.preventDefault()
              handleRemoveFavorite(favorite._id)
            }}
          >
            Remove Favorite
          </button>
        </div>
      )}
    </main>
  )
}

export default GameFavorite