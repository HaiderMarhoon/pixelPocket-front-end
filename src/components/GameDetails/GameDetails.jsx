import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'

const GameDetails = ({
    user,
    handleDeleteGame,
    
}) => {
    const {gameId} = useParams()
    const [game, setGame] = useState(null)

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await gameService.show(gameId)
            setGame(gameData)
        }
        fetchGame()
    }, [gameId])

    if(!game) return <main>Loading...</main>

    return(
        <main>
            <header>
            <img src={game.image} alt={game.title} style={{maxWidth: "300"}} />
            <p>{game.category.toUpperCase()}</p>
            <h1>{game.title}</h1>
            <p>
                {game.author.username} added on {new Date(game.createdAt).toLocalDataString()}
            </p>
            <p>Age Rating: {game.ageRate}+</p>
            <p>
                <a href={game.gameLink} target="_blank" rel='non'>
                    Play Game
                </a>
            </p>
            {user && game.author.id === user.id && (
                <>
                    <Link to={`/games/${gameId}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteGame(gameId)}>Delete</button>
                </>
            )}
            </header>
        </main>
    )
}

export default GameDetails;