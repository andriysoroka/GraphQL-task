const { ApolloServer, gql } = require('apollo-server');


const playlist = [
  {
    id: "1",
    title: 'Harry Potter and the Chamber of Secrets',
    genre: 'J.K. Rowling',
  },
  {
    id: "2",
    title: 'Jurassic Park',
    genre: 'Michael Crichton',
  },
];

const track = [
  {
    id: "1",
    name: 'mochono',
    band: 'LOL',
    starts_count:  '1',
  },
];

const typeDefs = gql`

  type Playlist {
    id: ID
    title: String
    genre: String
  }

  type Track {
    id: ID
    name: String
    band: String
    starts_count: String
  }

  input TrackInput {
    id: ID
    name: String
    band: String
    starts_count: String
  }

  input PlaylistInput {
    id: ID
    title: String
    genre: String
  }

  type Query {
    playlist: [Playlist]
    tracks: [Track]
    trackById(id: ID): Track
    playlistById(id: ID): Playlist
  }

  type Mutation {
    addTrack(input: TrackInput): Track
    addPlaylist(input: PlaylistInput): Playlist
  }
`;


const resolvers = {
  Query: {
    playlist: () => playlist,
    tracks: () => track,
    trackById: (_, {id}) => {
      const trackIndex = track.findIndex(track => track.id === `${id}`);
      return track[trackIndex]
    },
    playlistById: (_, {id}) => {
      const playlistIndex = playlist.findIndex(track => track.id === `${id}`);
      return playlist[playlistIndex]
    }
  },
  Mutation: {
    addTrack: (_, { input: {id, name, band, starts_count}}) => {
      const newTreck = {
        id: id,
        name: name,
        band: band,
        starts_count: starts_count
      }
      track.push(newTreck)
      return newTreck;
    },
    addPlaylist: (_, { input: {id, title, genre}}) => {
      const newPlaylist = {
        id: id,
        title: title,
        genre: genre
      }
      playlist.push(newPlaylist);
      return newPlaylist;
    }
  }
  
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});