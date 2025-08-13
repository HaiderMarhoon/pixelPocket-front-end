import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import * as gameService from '../../services/gameService'
import CommentForm from '../CommentForm/CommentForm';



const GameDetails = ({
    user,
    favorite,
    handleAddFavorite,
    handleRemoveFavorite, 
    handleDeleteGame
}) => {

    const { gamesId: gameId } = useParams()
    const [game, setGame] = useState({ comments: [] })
    const navigate = useNavigate()
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    

    const fetchGame = async () => {
        const gameData = await gameService.show(gameId);
        console.log("Fetched game data:", gameData);
        setGame({ ...gameData, comments: gameData.comments || [] });
    };
    const fetchAverageRating = async () => {
        try {
            const avgData = await gameService.getAverageRating(gameId);
            console.log("Fetched average rating:", avgData);
            setAverageRating(avgData);
        } catch (err) {
            console.error("Error fetching average rating:", err);
            setAverageRating(0);
        }
    };

    useEffect(() => {
        fetchGame();
        fetchAverageRating();
    }, [gameId]);


    const handleAddComment = async (formData) => {
    const newComment = await gameService.createComment({ comment: formData.comment }, gameId);
    console.log("New comment added:", newComment); 
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
    const handleRateGame = async (rating) => {
        if (!user) return; 
        try {
            await gameService.addRating(gameId, { user: user._id, value: rating });
            const avgRating = await gameService.getAverageRating(gameId);
            console.log("Fetched average rating:", avgRating);
            setAverageRating(avgRating);
        } catch (error) {
            console.error("Error rating the game:", error);
        }
    };


    if(!game) return <main>Loading...</main>
    

    const isFavorite = favorite && favorite._id === game._id

    return(
        <main>
            <div class="container">
                <div class="box">
                    <h1>{game.title}</h1>
                    <img id='header-img' src={game.image} alt={game.title}  />
                    <section>
                        {user && (
                            <div>
                                {isFavorite 
                                    ? <button onClick={() => handleAddFavorite(user._id, game._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                        </svg></button>
                                    : <button onClick={() => handleRemoveFavorite(user._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg></button>
                                }
                            </div>
                        )}
                    </section>
                </div>
                 <div class="box"> 
                    <header id='header-det'>
                        <h3>Category</h3>
                        <p>{game.category}</p>
                        <section>
                            <h3>About the game</h3>
                            <p>{game.body}</p>
                        </section>
                        <p>Age Rating: {game.ageRate}+</p>
                        <h3>Link</h3>
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
                </div>
                <div class="box">
                    <section>
                        <h2>Rating</h2>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button key={rating} onClick={() => handleRateGame(rating)}>
                                {rating} ⭐
                            </button>
                        ))}
                        <p>Average Rating: {averageRating.toFixed(1)} ⭐</p>
                    </section>
                </div>
                <div class="box">
                   <section>
                        <h2>Comments</h2>
                            {(!game.comments || game.comments.length === 0) && <p>No comments.</p>}
                            {game.comments.map((comment) => (
                                editingCommentId === comment._id ? (
                                    <CommentForm
                                    key={comment._id}
                                    initialText={editingText}
                                    handleAddC omment={handleUpdateComment}
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
                </div>
            </div>
        </main>
    )
}

export default GameDetails;