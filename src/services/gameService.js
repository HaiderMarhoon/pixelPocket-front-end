const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`

const index = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const show = async (gameId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${gameId}`, {
        headers: {
            Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const create = async (formData) =>{
  try{

    const token = localStorage.getItem('token')
    if (!token) throw new Error('No authentication token found')

    const res = await fetch(BASE_URL, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to create game')
    }

    const data = await res.json()
    return data
    
  }catch(err){
    console.log(err)
  }
}

const createComment = async (formData, gameId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${gameId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });
    return await res.json();
};

const updateComment = async (formData, gameId, commentId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${gameId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });

    if (!res.ok) {
        throw new Error('Failed to update comment');
    }

    return await res.json(); // Return the updated comment data
};

const deleteComment = async (gameId, commentId) => {
    const token = localStorage.getItem('token');
    await fetch(`${BASE_URL}/${gameId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


const update = async (formData, gameId) =>{
  try{
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method:"PUT",
      headers:{
        'Content-Type':'application',
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    return data
  }
  catch(err){
    console.log(err)
  }
}

export {
  index,create , show, update,updateComment,deleteComment,createComment
}