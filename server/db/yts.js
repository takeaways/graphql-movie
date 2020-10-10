import axios from "axios"

const API_URL = "https://yts.mx/api/v2/list_movies.json"
const HTTP = axios.create({
    baseURL:API_URL
})

export const getMovies = async ({limit, rating}) =>{
    const params = {}
    if(limit > 0){
        params.limit = limit
    }
    if(rating > 0){
        params.minimum_rating = rating
    }
   const result =  await HTTP.get("/",{
    params
   })
 
   return result.data.data.movies
}

