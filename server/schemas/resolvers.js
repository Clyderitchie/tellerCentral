const { AuthenticationError, signToken } = require('../utils/auth');

const { Teller } = require('../models');

module.exports = {
    Query: {
        getAllTellers: async () => {
            return await Teller.find({});
        },
        getTeller: async (_, args) => {
            return await Teller.findById(args.tellerId);
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
        }
    }
};