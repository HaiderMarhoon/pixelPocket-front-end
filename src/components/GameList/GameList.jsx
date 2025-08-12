import { useState } from 'react';
import { Link } from 'react-router-dom';

const GameList = (props) => {
  const [search, setSearchQuery] = useState('');

  const filteredGameBrowser = props.games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchBrowserChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchBrowserSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>

      <div id='browser'>
        <div id='title-browser'>
          <h1>Game Browser</h1>
        </div>
        <form onSubmit={handleSearchBrowserSubmit}>
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={handleSearchBrowserChange}
          />
          <button type='submit'>Search</button>
        </form>
        <div id='browser-item'>
          {filteredGameBrowser.map((game) => (
            <Link key={game._id} to={`/games/${game._id}`}>
              <article>
                <p>{game.text}</p>
                <img src={game.image} alt={game.title} />
                <h2>{game.title}</h2>
              </article>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
};

export default GameList;