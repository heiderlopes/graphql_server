const {ApolloServer} = require("apollo-server")
const gameSchema = require('./api/game/schema/game.graphql')
const gameResolvers = require('./api/game/resolvers/gameResolver.js')

const GameAPI = require("./api/game/datasource/game")

const typeDefs = [gameSchema]
const resolvers = [gameResolvers]

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            gameAPI: new GameAPI()
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Servidor rodando na porta ${url}` );
})
