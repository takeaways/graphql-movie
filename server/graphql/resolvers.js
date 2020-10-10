import { getMovies }from "../db/yts"

const resolvers = {
    Query:{
        movies: (_, args) => getMovies(args),
    }
}

export default resolvers