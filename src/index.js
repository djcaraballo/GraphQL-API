import { GraphQLServer } from 'graphql-yoga'

const typeDefs = 
  type Query {
    exchangeRate(currency: String!): Float
  }

const resolvers = {
  Query: {
    exchangeRate: (root, variables, context) => {
      return 9000.01
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

//  Go to http://localhost:4000 to test your API
server.start(() => console.log('Server running on :4000'))
