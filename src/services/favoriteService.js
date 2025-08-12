const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/user`

// GET FAVORITE
const getFavorite = async (userId) => {
    const token = localStorage.getItem('token');
    const res = await fetch (`${BASE_URL}/${userId}/favorite`, {
        headers: { Authorization: `Bearer ${token}`}
    });
    const data = await res.json();
    return data.favorites;
}
// POST FAVORITE
const addFavorite = async (userId, gameId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite/${gameId}`,{
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`}
    })
    return (await res.json()).favorites;
}
// DELETE FAVORITE
const removeFavorite = async (userId, gameId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${userId}/favorite/${gameId}`,{
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`}
    });
    return (await res.json()).favorites;
}

export{
  getFavorite,
  addFavorite,
  removeFavorite,
}