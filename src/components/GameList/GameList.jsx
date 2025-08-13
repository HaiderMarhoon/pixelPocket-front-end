import { useState } from 'react';
import { Link } from 'react-router-dom';

const GameList = ({ games, showSearch = true, showTitle = true }) => {
  const [search, setSearch] = useState('');

  const filteredGameBrowser = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchBrowserChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchBrowserSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <div id='browser'>
        
        {showSearch && (
          <form onSubmit={handleSearchBrowserSubmit}>
            <input
              type='text'
              placeholder='Search'
              value={search}
              id="searchBar"
              onChange={handleSearchBrowserChange}
            />
          </form> 
          
        )}

        {showTitle && (
          <div id='browser-title'>
            <h1>Game Browser</h1>
          </div>
        )}

        <div id='browser-item'>
          {filteredGameBrowser.map((game) => (
            <Link key={game._id} to={`/games/${game._id}`}>
              <article>
                <img id='browser-item-img' src={game.image} alt={game.title} />
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
