import { useState, useEffect } from 'react'

import * as gameService from '../../services/gameService'

const CommentForm = (props) => {
  	const initialState = { comment: '' }
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
        if (props.initialText) {
            setFormData({ comment: props.initialText });
        } else {
            setFormData(initialState);
        }
    }, [props.initialText]);
	
	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

	const handleSubmit = async(evt) => {
		evt.preventDefault()
		await props.handleAddComment(formData)
		setFormData({ comment: '' })
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="text-input">Your comment:</label>
			<textarea 
            required
				type="text"
				name="comment"
				id="text-input"
				value={formData.comment}
				onChange={handleChange}
			/>
			<button type="submit">SUBMIT COMMENT</button>
		</form>
	)
}

export default CommentForm