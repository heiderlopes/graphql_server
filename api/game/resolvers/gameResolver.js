const { GraphQLScalarType } = require('graphql')

const gameResolvers = {

    GameType : {
        DIGITAL: "DIGITAL",
        FISICO: "FISICO"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value,
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    Query: {
        games : (root, args, { dataSources } ) => dataSources.gameAPI.getGames(),
        game : (root, {id}, {dataSources}) => dataSources.gameAPI.getGameById(id)
    },

    Mutation: {
        addGame: async (root, {game}, {dataSources}) => dataSources.gameAPI.addGame(game),
        updateGame: async (root, data, {dataSources}) => dataSources.gameAPI.updateGame(data),
        deleteGame: async (root, { id }, { dataSources }) => dataSources.gameAPI.deleteGame(id)
    }
} 

module.exports = gameResolvers