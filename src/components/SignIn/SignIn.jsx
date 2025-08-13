import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = (props) => {
  const navigate = useNavigate()

  const initialState = {
    usernameOrEmail: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleSignIn(formData)
    navigate('/')
  }

  return (
    <main>
      <h1>Sign In Form</h1>
      <form className="com-form" onSubmit={handleSubmit}>
        <div class="col-26">
          <label>Username Or Email:</label>
        </div>
        <div class="col-75">
        <input type="text" name='usernameOrEmail' onChange={handleChange} />
        </div>
        <div class="col-26">
          <label>Password:</label>
        </div>
        <div class="col-75">
          <input type="password" name='password' onChange={handleChange} />
        </div>
        
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}

export default SignIn