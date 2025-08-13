import { Link } from 'react-router-dom'

const GameFavorite = ({ favorite, handleRemoveFavorite }) => {
  if (!favorite) return <p>Loading favorite...</p>;

  return (
    <main>
      <div id='browser'>
        <h1>Favorite Games</h1>
        {favorite.length === 0 ? (
          <p>No favorite games yet.</p>
        ) : (
          favorite.map(game => (
            <div key={game._id} className="game-card">
              <Link to={`/games/${game._id}`}>
              <article>
                <img id='browser-item-img' src={game.image} alt={game.title} />
                <h2>{game.title}</h2>
              </article>
              </Link>
              <button onClick={e => {
                e.preventDefault();
                handleRemoveFavorite(game._id);
              }}>
                Remove Favorite
              </button>
            </div>
          ))
        )}
      </div>
    </main>
    
  );
};


export default GameFavorite