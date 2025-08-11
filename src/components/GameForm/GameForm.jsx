import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const GameForm = (props) =>{

    const { gameId } = useParams

    const initialState = {
        title:"",
        category:"",
        body:"",
        ageRate: "",
        image:"",
        gameLink:""
    }

    const [formData , setFormData] = useState(initialState)

    useEffect(()=>{
        const fetchGame = async ()=>{
            const data = await gameService.show(gameId)
            setFormData(data)
        }
        if(gameId) fetchGame()
    },[gameId])

    const handleChange = (evt) =>{
        setFormData({...formData, [evt.target.name]: evt.target.value})

    }

    const handleSubmit = (evt) =>{
        evt.preventDefault()

        // if(gameId){
        //     props.ha
        // }

    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <h1>{gameId ? 'Edit Game' : 'New Game'}</h1>

                <label htmlFor="title">Title</label>
                <input type="text" name="" id="" />
            </form>
        </main>
    )



}

export default GameForm