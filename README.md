# graphql-movie

## GrahpQL을 사용하는 이유

- 데이터 베이스에 내가 사용하지 않을 영역의 데이터를요청하는 것은 좋지 않다.
  - (over-fetching)
- 하나의 페이지를 구성하기 위해서 여러번의 REST를 호출해서 데이터를 만들 필요가 없다.
  - (under-fetching)
- 오직 하나의 end-poing를 가지고 query를 작성하여 데이터를 요청하고 받을 수 있다.

## Graphql Server 생성하기

```javascript
import { GraphQLServer } from "graphql-yoga"; //graphql server를 만드기 위한 패키지
import resolvers from "./graphql/resolvers";
const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers,
});
server.start(() => {
  console.log("Graphql Server Running");
});
```

- db

  - movie data base

    ````gql
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
        ```

    ````

  - schema

    - 사용자에게 보내거나 사용자로 부터 받을 data에 대한 설명
    - 오직 그래프 큐엘을 위한 것입니다.
    - query : 데이터 베이스에서 데이터를 받을때.

      ```gql
      type Movie {
        id: Int!
        name: String!
        score: Int
      }

      type Query {
        movies: [Movie]!
        movie(id: Int!): Movie
      }

      type Mutation {
        addMovie(name: String!, score: Int!): Movie!
        removeMovie(id: Int!): Boolean!
      }
      ```

    ```

    ```

  - resolver : 요청 전문에 대한 데이터 처리 함수.

    ```javascript
    // graphql/resolvers.js
    const geonil = {
      id: 1,
      name: "Geonil Jang",
      age: 29,
      gender: "male",
    };
    const may = {
      id: 2,
      name: "May",
      age: 27,
      gender: "female",
    };

    const people = [geonil, may];

    const getById = ({ id }) => people.find((person) => person.id === id);
    const resolvers = {
      Query: {
        person: (_, args) => getById(args),
        people: () => people,
      },
      Mutation: {
        removeMovie: (_, args) => delMovie(args),
        addMovie: (_, args) => addMovie(args),
      },
    };

    export default resolvers;
    ```

  - mutation : 데이터 베이스 정보를 바꾸는 일을 할 때.

    ```gql
    type Movie {
      id: Int!
      name: String!
      score: Int
    }

    type Query {
      movies: [Movie]!
      movie(id: Int!): Movie
    }

    type Mutation {
      addMovie(name: String!, score: Int!): Movie!
      removeMovie(id: Int!): Boolean!
    }
    ```

> tip
> graphql query에 파라미터를 적으려면 이름을 적어서 넘겨주어야 한다.

## Apollo Client

- 장점

  - cache 요청한 정도를 캐쉬 해서 다시 요청하지 않는다.
    - redux를 이용해서 이 기능을 사용하고자 하면 스스로 구현을 해줘야 한다.

- 사용법
  - gql을 이용하여 쿼리문을 작성한다.
  - 변수를 사용하기 위해서는 아폴로 만을 위한 이름을 지어서 변수를 전달해 주어야 한다.
  ```gql
  const GET_MOVIE = gql`
    # 변수 선언은 $표시를 이용해서 전달하며 서버에서 정의된 타입의 값일 적어 주어야 한다.
    # 그러나 프론트에서는 서버의 타입을 알 수 있는 부분이고 정의 하는게 아니라 그냥 타입을 # 적어 주기만 하면 된다. 해당 타입은 playground 문서에서 확인이 가능한다.
    # input의 타입을 같게 맞추어 변수로 넘겨 주게 되면 사용하는 것이 용의 해진다.
    # 이름의 변수로 받은 것은 resolver 2번째 인자로 전달 받을 수 있으며 객체의 형태로 전달 되기 때문에 디스트럭쳐링을 해줘야 합니다.
    query getMovie($id: Int!) {
      movie(id: $id) {
        id
        title
        medium_cover_image
        language
        rating
        description_intro
      }
      suggestions(id: $id) {
        id
        medium_cover_image
      }
    }
  `;
  ```
