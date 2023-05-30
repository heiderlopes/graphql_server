const { RESTDataSource  } = require('apollo-datasource-rest')

class GameAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000'
        this.customResponse = {
            code: 200,
            message: "Operação efetuada com sucesso"
        }
    }

    async getGames() {
        const games = await this.get('/games')
        return games.map(async game => ({
            id: game.id,
            name: game.name,
            imageURL: game.imageURL,
            active: game.active,
            createdAt: game.createdAt,
            type: await this.get(`/types/${game.type}`)
        }));
    }

    async getGameById(id) {
        const game = await this.get(`/games/${id}`)
        game.type = await this.get(`/types/${game.type}`)
        return game
    }

    async addGame(game) {
        const games = await this.get("/games")
        
        game.id = games[games.length-1].id + 1;
        
        const type = await this.get(`/types/?type=${game.type}`)
        console.log(type);
        await this.post('games', {...game, type: type[0].id})
        return ({
            ...game,
            type: type[0]
        })
    }

    async updateGame(data) {
        const type = await this.get(`/types/?type=${data.game.type}`)

        await this.put(`games/${data.id}`, {...data.game, type: type[0].id})
           
        return ({
            ...this.customResponse,
            game: {
                ...data.game,
                type: type[0]
            }
        })
    }

    async deleteGame(id) {
        await this.delete(`games/${id}`)
        return this.customResponse
    }
}

module.exports = GameAPI