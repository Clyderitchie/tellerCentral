const gql = String.raw;

module.exports = gql`

type Teller {
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    locationId: Int
}

type Auth {
        token: ID
        teller: Teller
}

type Query {
    getAllTellers: [Teller]
    getTeller(tellerId: ID): Teller
}

type Mutation {
    createTeller( firstName: String, lastName: String, email: String, username: String, password: String, locationId: Int ): Auth
    login( username: String!, password: String! ): Auth
}

`