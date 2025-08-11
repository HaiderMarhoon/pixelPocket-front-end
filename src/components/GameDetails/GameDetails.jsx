import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'
import CommentForm from '../CommentForm/CommentForm';

const GameDetails = ({
    user,
    handleDeleteGame,
    
}) => {
    const {gameId} = useParams()
    const [game, setGame] = useState(null)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingText, setEditingText] = useState('')

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await gameService.show(gameId)
            setGame(gameData)
        }
        fetchGame()
    }, [gameId])

    // handle comments
    const handleAddComment = async (formData) => {
        const newComment = await gameService.createComment(formData, gameId)
        setGame({...game, comments: [...game.comments, newComment]})
    }

    // edit comments handle
    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id)
        setEditingText(comment.text)
    }

    // update comments handle
    const handleUpdateComment = async (formData) => {
        const updated = await gameService.updateComment(formData, gameId, editingCommentId)
        setGame({
            ...game,
            comments: game.comments.map(c => c.id === editingCommentId ? updated : c)
        })
        setEditingCommentId(null)
        setEditingText('')
    }


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
            <section>
                <h2>Comments</h2>
                {user && !editingCommentId && (
                    <CommentForm handleSubmit={handleAddComment} submitLabel="Add Comment" />
                    
                )}
            </section>
        </main>
    )
}

export default GameDetails;