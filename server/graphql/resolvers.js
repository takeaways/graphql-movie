import {addMovie, delMovie, getMovieById, getMovies}from "../db/movie"

const resolvers ={
    Query:{
        movie: (_,args)=>getMovieById(args),
        movies:()=>getMovies(),
     
    },
    Mutation:{
        removeMovie:(_,args) => delMovie(args),
        addMovie:(_,args) => addMovie(args)
    }
}

export default resolvers