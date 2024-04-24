const gql = String.raw;

module.exports = gql`

type Account {
	_id: ID
	accountType: String
	balance: Int
	clientId: Client
}

type Teller {
    _id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    locationId: Int
}

type Client {
    _id: ID
    firstName: String
    lastName: String
    email: String
    address: String
    phoneNumber: String
    accounts: [Account]
}

type Auth {
        token: ID
        teller: Teller
}

type Query {
    getAllTellers: [Teller]
    getTeller(tellerId: ID): Teller
    getAllClients: [Client]
    getClient(clientId: ID, firstName: String, lastName: String, email: String, address: String, phoneNumber: String ): [Client]
    getAllAccounts: [Account]
    getAccount(accountId: ID): Account 
}

type Mutation {
    createTeller( firstName: String, lastName: String, email: String, username: String, password: String, locationId: Int ): Auth
    login( username: String!, password: String! ): Auth
    createClient( firstName: String, lastName: String, email: String, address: String, phoneNumber: String ): Client
    createAccount( accountType: String, balance: Int, clientId: ID!): Account
}

`