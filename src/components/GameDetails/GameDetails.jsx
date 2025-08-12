import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'
import CommentForm from '../CommentForm/CommentForm';



const GameDetails = ({
    user,
    favorite,
    handleAddFavorite,
    handleRemoveFavorite
}) => {

    const { gamesId: gameId } = useParams()
    const [game, setGame] = useState({ comments: [] })
    const navigate = useNavigate()
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingText, setEditingText] = useState('')

    const fetchGame = async () => {
        const gameData = await gameService.show(gameId);
        console.log("Fetched game data:", gameData);
        setGame({ ...gameData, comments: gameData.comments || [] });
    };
    useEffect(() => {
        fetchGame();
    }, [gameId]);


    const handleAddComment = async (formData) => {
    const newComment = await gameService.createComment({ comment: formData.comment }, gameId);
    console.log("New comment added:", newComment); // Check if the new comment is fetched correctly
    setGame((prevGame) => ({
        ...prevGame,
        comments: [...prevGame.comments, newComment],
    }));
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id)
        setEditingText(comment.text)
    }

    const handleUpdateComment = async (formData) => {
        await gameService.updateComment({ comment: formData.comment }, gameId, editingCommentId);
        fetchGame(); 
        setEditingCommentId(null);
        setEditingText('');
    };

    const handleDeleteComment = async (commentId) => {
        await gameService.deleteComment(gameId, commentId);
        fetchGame(); 
    };


    if(!game) return <main>Loading...</main>
    

    const isFavorite = favorite && favorite._id === game._id

    return(
        <main>
            <header>
                <img src={game.image} alt={game.title} style={{maxWidth: "300px"}} />
                <p>{game.category}</p>
                <h1>{game.title}</h1>
               
                    <p>
                        {game.author?.username}
                    </p>
                

                <p>Age Rating: {game.ageRate}+</p>
                <p>
                    <a href={game.gameLink} target="_blank" rel='non'>
                        Play Game
                    </a>
                </p>
                {user && game.author && String(game.author._id) === String(user._id) && (
                    <>
                        <Link to={`/games/${gameId}/edit`}>Edit</Link>
                        <button onClick={() => handleDeleteGame(gameId)}>Delete</button>
                    </>
                )}

            </header>
            <section>
                <h2>Description</h2>
                <p>{game.body}</p>
            </section>
            <section>
                {user && (
                    <div>
                        {isFavorite 
                            ? <button onClick={() => handleAddFavorite(user._id, game._id)}>★</button>
                            : <button onClick={() => handleRemoveFavorite(user._id)}>☆</button>
                        }
                    </div>
                )}
            </section>
            <section>
                <h2>Comments</h2>
                {(!game.comments || game.comments.length === 0) && <p>No comments.</p>}
                {game.comments.map((comment) => (
                    editingCommentId === comment._id ? (
                        <CommentForm
                            key={comment._id}
                            initialText={editingText}
                            handleAddComment={handleUpdateComment}
                            submitLabel="Update"
                            handleCancel={() => setEditingCommentId(null)}
                        />
                    ) : (
                        <div key={comment._id}>
                            <p>
                                <b>{comment.author?.username || 'Unknown Author'}</b>: {comment.comment}
                            </p>
                            {user && comment.author?._id === user._id && (
                                <>
                                    <button onClick={() => handleEditComment(comment)}>Edit</button>
                                    <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    )
                ))}
                  {user && !editingCommentId && (
                     <CommentForm handleAddComment={handleAddComment} submitLabel="Add Comment" />
                    )}
            </section>
        </main>
    )
}

export default GameDetails;