
const getGifs = async (search) => {
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=`)
    return response.json();
  }
  
  const getImgs = async (search) => {
    const fetchImages = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=5&query=${search}`, {
      method: 'GET',
      headers: {
        "Authorization": ""
      }
    })
    return await fetchImages.json();
  }

  module.exports = {
    getGifs,
    getImgs,
  }
