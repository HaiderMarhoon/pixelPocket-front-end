const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

// GET FAVORITES
const getFavorite = async (userId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite`, {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        }
    });
    if (!res.ok) throw new Error('Failed to fetch favorites');
    return await res.json();
};

// POST FAVORITE
const addFavorite = async (userId, gameId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite/${gameId}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to add favorite');
    return await res.json();
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
    return await res.json();
};

export{
    getFavorite,addFavorite,removeFavorite
}