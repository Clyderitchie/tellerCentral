const { AuthenticationError, signToken } = require('../utils/auth');

const { Teller, Client } = require('../models');

module.exports = {
    Query: {
        getAllTellers: async () => {
            return await Teller.find({});
        },
        getTeller: async (_, args) => {
            return await Teller.findById(args.tellerId);
        },
        getAllClients: async () => {
            return await Client.find({});
        },
        getClient: async (_, args) => {
            return await Client.findById(args.clientId);
        }

    },
    Mutation: {
        createTeller: async (_, args) => {
            const teller = await Teller.create(args);
            const token = signToken(teller);

            return { token, teller };
        },
        login: async (_, { username, password }) => {
            const teller = await Teller.findOne({ username });

            if (!teller) {
                throw AuthenticationError;
            }

            const correctPw = await teller.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(teller);

            return { token, teller};
        },
        createClient: async (_, args) => {
            const client = await Client.create(args);
            return client;
        }
    }
};