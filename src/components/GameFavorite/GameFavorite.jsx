import { Link } from 'react-router-dom';

const GameFavorite = ({ favorite, handleRemoveFavorite }) => {
  if (!favorite) return <p>Loading favorite...</p>;

  return (
    <main>
      <div id='browser'>
        <h1>Favorite Games</h1>
        {favorite.length === 0 ? (
          <p>No favorite games yet.</p>
        ) : (
          <ul>
            {favorite.map(game => (
              <li key={game._id}> 
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default GameFavorite;