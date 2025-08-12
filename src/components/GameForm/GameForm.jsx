import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as gameService from "../../services/gameService"

const GameForm = (props) => {
    const { gameId } = useParams()

    const initialState = {
        title: "",
        category: "",
        body: "",
        ageRate: "",
        image: "",
        gameLink: ""
    }

    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
            const fetchGame = async () => {
                const data = await gameService.show(gameId)
                setFormData(data)
            }
            if (gameId) fetchGame()
    }, [gameId])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit =  (evt) => {
        evt.preventDefault()
        try{
            if(gameId){
                props.handleUpdateGame(formData,gameId)
            }else{
                props.handleAddGame(formData);
            }
        }
        catch(err){
            console.error('Submission error:', err)
        }
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <h1>{gameId ? 'Edit Game' : 'New Game'}</h1>

                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={formData.title}
                onChange={handleChange} />
                <label htmlFor="category">Category</label>
                <select name="category" id="category" value={formData.category}
                onChange={handleChange}>
                    <option value="action">action</option>
                    <option value="sport">sport</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Horror">Horror</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="MMO">MMO</option>
                </select>
                <label htmlFor="body">Body</label>
                <input type="text" name="body" id="body" value={formData.body}
                onChange={handleChange} />
                <label htmlFor="ageRate">age Rate</label>
                <input type="Number" name="ageRate" id="ageRate" value={formData.ageRate}
                onChange={handleChange} />
                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" value={formData.image}
                onChange={handleChange} />
                <label htmlFor="gameLink">gameLink</label>
                <input type="text" name="gameLink" id="gameLink" value={formData.gameLink}
                onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default GameForm