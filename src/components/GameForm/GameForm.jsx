import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as gameService from "../../services/gameService"

const GameForm = (props) => {
    const { gamesId } = useParams()
    console.log(gamesId)
    const navegite = useNavigate()

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
                const data = await gameService.show(gamesId)
                setFormData(data)
            }
            if (gamesId) fetchGame()
    }, [gamesId])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        try {
            if (gamesId) {
                props.handleUpdateGame(formData, gamesId);
            } else {
                props.handleAddGame(formData);
            }
            navegite("/games")
        } catch (err) {
            console.error('Submission error:', err);
        }
    };

    return(
        <main>
            <div id='browser'>
                <form className="com-form" onSubmit={handleSubmit}>
                    <h1>{gamesId ? 'Edit Game' : 'New Game'}</h1>
                    
                    <div class="col-26">
                        <label htmlFor="title">Title</label>
                    </div>
                    <div class="col-75">
                        <input type="text" name="title" id="title-form" value={formData.title}
                    onChange={handleChange} />
                    </div>
                    <div class="col-26">
                        <label htmlFor="category">Category</label>
                    </div>
                    <div class="col-75">
                        <select name="category" id="category" value={formData.category}
                        onChange={handleChange}>
                            <option value="action">action</option>
                            <option value="sport">sport</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Horror">Horror</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="MMO">MMO</option>
                        </select>
                    </div>
                    <div class="col-26">
                        <label htmlFor="body">Body</label>
                    </div>
                    <div class="col-75">
                        <textarea type="text" name="body" id="body" value={formData.body}
                    onChange={handleChange} />
                    </div>
                    <div class="col-26">
                        <label htmlFor="ageRate">age Rate</label>
                    </div>
                    <div class="col-75">

                        <input type="Number" name="ageRate" id="ageRate" value={formData.ageRate}
                    onChange={handleChange} />
                    </div>
                    <div class="col-26">

                        <label htmlFor="image">Image</label>
                    </div>
                    <div class="col-75">

                        <input type="text" name="image" id="image" value={formData.image}
                    onChange={handleChange} />
                    </div>
                    <div class="col-26">
                        <label htmlFor="gameLink">game Link</label>
                    </div>
                    <div class="col-75">
                        <input type="text" name="gameLink" id="gameLink" value={formData.gameLink}
                    onChange={handleChange} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}

export default GameForm