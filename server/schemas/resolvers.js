const { AuthenticationError, signToken } = require('../utils/auth');

const { Teller, Client, Account } = require('../models');

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
            const { clientId, firstName, lastName, email, address, phoneNumber, tin } = args;

            const filter = {};
            if (clientId) filter._id = clientId;
            if (firstName) filter.firstName = firstName;
            if (lastName) filter.lastName = lastName;
            if (email) filter.email = email;
            if (address) filter.address = address;
            if (phoneNumber) filter.phoneNumber = phoneNumber;
            if (tin) filter.tin = tin;
            try {
                // Find clients based on the filter object
                const clients = await Client.find(filter).populate('accounts');
                console.log("Clients: ", clients);
                return clients;
              } catch (error) {
                throw new Error('Failed to fetch clients');
              }
              
        },
        getAllAccounts: async () => {
			return await Account.find({}); 
		},
		getAccount: async (_, args) => {
			return await Account.findById(args.accountId).populate("clientId"); 
		},

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

            return { token, teller };
        },
        createClient: async (_, args) => {
            const client = await Client.create(args);
            return client;
        },
        createAccount: async (_, args) => {
			const acct = await Account.create(args); 
			 await Client.findOneAndUpdate({_id: args.clientId}, {$push: { accounts: acct._id } }, { new: true } )
			 return acct.populate("clientId") 
		},
    }
};