const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

// GET FAVORITES
const getFavorite = async (userId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        }
    });
    if (!res.ok) throw new Error('Failed to fetch favorites');
    const data = await res.json();
    return data.favorites;
};

// POST FAVORITE
const addFavorite = async (gameId, userId) => {
    const token = localStorage.getItem('token');
    console.log(userId)
    const res = await fetch(`${BASE_URL}/${userId}/favorite/${gameId}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(res)
    if (!res.ok) throw new Error('Failed to add favorite');
    const data = await res.json();
    return data.favorites; 
};

// DELETE FAVORITE
const removeFavorite = async (userId, gameId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite/${gameId}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to remove favorite');
    const data = await res.json();
    return data.favorites; // Return the updated favorites
};

export{
    getFavorite,addFavorite,removeFavorite
}