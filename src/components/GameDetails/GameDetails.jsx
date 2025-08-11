import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'
import CommentForm from '../CommentForm/CommentForm';
import { Link } from 'react-router-dom';


const GameDetails = ({
    user,
    handleDeleteGame
}) => {
    const { gamesId: gameId } = useParams()
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

    // edit comments handler
    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id)
        setEditingText(comment.text)
    }

    // update comments handler
    const handleUpdateComment = async (formData) => {
        const updated = await gameService.updateComment(formData, gameId, editingCommentId)
        setGame({
            ...game,
            comments: game.comments.map(c => c._id === editingCommentId ? updated : c)

        })
        setEditingCommentId(null)
        setEditingText('')
    }
    
    // delete comments handler
    const handleDeleteComment = async (commentId) => {
        await gameService.deleteComment(gameId, commentId)
        setGame({
            ...game,
            comments: game.comments.filter(c => c._id !== commentId)
        })
    }
    const handleDeleteGame = async (id) => {
        await gameService.deleteGame(id)
        navigate('/games')
    }



    if(!game) return <main>Loading...</main>

    return(
        <main>
            <header>
            <img src={game.image} alt={game.title} style={{maxWidth: "300"}} />
            <p>{game.category}</p>
            <h1>{game.title}</h1>
            <p>

            </p>
            <p>Age Rating: {game.ageRate}+</p>
            <p>
                <a href={game.gameLink} target="_blank" rel='non'>
                    Play Game
                </a>
            </p>
            {user === user.id && (
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
                {/* {!game.comments.length && <p>No comments.</p>} */}
                {game.comments.map((comment) => 
                    editingCommentId === comment.id ? (
                        <CommentForm
                            key={comment._id}
                            initialText={editingText}
                            handleSubmit={handleUpdateComment}
                            submitlabel="Update"
                            handleCancel={() => setEditingCommentId(null)}
                            />
                    ):(
                        <div key={comment._id}>
                            <p>
                                <b>{comment.author.username}</b>:{' '}
                                {comment.text}
                                <span>
                                {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </p>
                            {user && comment.author._id === user._id && (
                                <>
                                <button onClick={() => handleEditComment(comment)}>Edit</button>
                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>

                                </>
                            )}
                        </div>
                    ))}
            </section>
        </main>
    )
}

export default GameDetails;