const { ApolloServer, gql } = require('apollo-server');


const playlist = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    genre: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    genre: 'Michael Crichton',
  },
];

const track = [
  {
    name: 'mochono',
    band: 'LOL',
    starts_count:  '1',
  },
];

const typeDefs = gql`

  type Playlist {
    title: String
    genre: String
  }

  type Track {
    name: String
    band: String
    starts_count: String
  }

  type Query {
    playlist: [Playlist]
    track: [Track]
  }
`;


const resolvers = {
  Query: {
    playlist: () => playlist,
    track: () => track
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});