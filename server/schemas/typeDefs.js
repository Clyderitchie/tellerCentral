const gql = String.raw;

module.exports = gql`

type Service {
    _id: ID
    debitCard: String
    checks: String
    onlineBanking: String
    creditCard: String
    clientId: Client
}

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
    tin: String
    accounts: [Account]
    services: [Service]
}

type Auth {
        token: ID
        teller: Teller
}

type Query {
    getAllTellers: [Teller]
    getTeller(tellerId: ID): Teller
    getAllClients: [Client]
    getClient(clientId: ID, firstName: String, lastName: String, email: String, address: String, phoneNumber: String, tin: String ): [Client]
    getAllAccounts: [Account]
    getAccount(accountId: ID): Account 
}

type Mutation {
    createTeller( firstName: String, lastName: String, email: String, username: String, password: String, locationId: Int ): Auth
    login( username: String!, password: String! ): Auth
    createClient( firstName: String, lastName: String, email: String, address: String, phoneNumber: String, tin: String ): Client
    createAccount( accountType: String, balance: Int, clientId: ID!): Account
    createService( debitCard: String, checks: String, onlineBanking: String, creditCard: String, clientId: ID!): Service
}

`