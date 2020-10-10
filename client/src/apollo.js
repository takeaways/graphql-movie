import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  resolvers:{
      Movie:{
          isLiked:()=>false
      },
      Mutation:{
          likeMovie:(_,{id},{cache})=>{
             cache.wri({
                id:cache.identify(id),
                fields:{
                    isLike(cached){
                        return true
                    }
                }
             })
          }
      }
  }
});

export default client