import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'

const GameDetails = ({
    user,
    favorite,
    
}) => {
    const {gameId} = useParams()
    const [game, setGame] = useState(null)
    const [editText, setEditText] = useState('')

    useInsertionEffect(() => {
        const fetchGame = async () => {
            const gameData = await gameService.show(gameId)
            setGame(gameData)
        }
        fetchGame()
    }, [gameId])

    if(!game) return <main>Loading...</main>

    return(
        <main>
            <img src={game.image} alt={game} />
        </main>
    )
}

export default GameDetails;