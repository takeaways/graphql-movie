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
