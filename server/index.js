import {GraphQLServer} from "graphql-yoga"
import resolvers from "./graphql/resolvers"
const server = new GraphQLServer({
    typeDefs:"graphql/yts.graphql",
    resolvers
})
server.start(()=>{
    console.log("Graphql Server Running")
})