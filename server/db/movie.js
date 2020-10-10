let db = [
    {
        id:1,
        name:"어벤져스1",
        score:0
    },
    {
        id:2,
        name:"어벤져스2",
        score:3
    },
    {
        id:3,
        name:"어벤져스3",
        score:4
    }
]

export const getMovieById =({id})=> db.find(m=>m.id===id);
export const getMovies = ()=>db
export const delMovie=({id}) =>{
    const movies = db.filter(m=>m.id!==id)
    if(movies.length > 0){
        db = movies 
    }
    return movies.length > 0 ? true : false
}
export const addMovie= ({name,score})=>{
    const newMovie = {
        id:db.length+1,
        name,
        score,
    }
    db.push(newMovie)
    return newMovie
}