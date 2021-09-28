
const getGifs = async (search) => {
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=CX0ZV06ojVd6yfvX7CWTPsGHjpEgzW7p&limit=5`)
    return response.json();
  }
  
  const getImgs = async (search) => {
    const fetchImages = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=5&query=${search}`, {
      method: 'GET',
      headers: {
        "Authorization": "Client-ID lU_jTDuxL1RXnVaEjSjM_UK4eI48LzcBLWIY98Gae44"
      }
    })
    return await fetchImages.json();
  }

  module.exports = {
    getGifs,
    getImgs,
  }
