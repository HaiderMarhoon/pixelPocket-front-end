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
    const data = await res.json();
    return data.favorite;
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
    const data = await res.json();
    return data.favorite;
};

// DELETE FAVORITE
const removeFavorite = async (userId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite/`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to remove favorite');
    const data = await res.json();
    return data.favorite;
};

export{
    getFavorite,addFavorite,removeFavorite
}