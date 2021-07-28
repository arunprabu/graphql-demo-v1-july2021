const express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

const schema = buildSchema(` 
  type User{
    id: Int,
    name: String,
    phone: String,
    email: String
  }

  type Query{
    hello: String,
    greet(name: String): String,
    registeredUserList: [String],
    getAge: Int,
    user: User,
    userList: [User]
  }
`);

const root = { 
  hello: () => {
    // ideal place for you to exec db queries
    return 'Hello World!';
  },
  greet: (args) => {
    console.log(args); // args - an object -- will fetch you the passed params from the query
    return `Good Morning, ${args.name}!`;
  },
  registeredUserList: () => {
    const users = [
      'John', 'Steve', 'Arun'
    ];
    return users;
  },
  getAge: () => 99,
  user: () => {
    const tempUser = {
      id: 1, 
      name: "Arun",
      email: "a@b.com",
      phone: "234234"
    }
    return tempUser;
  },
  userList: (args ) => {
    const tempUsers = [
      {
        id: 1,
        name: "A",
        email: "a@b.com",
        phone: "34232324"
      },
      {
        id: 2,
        name: "B",
        email: "b@c.com",
        phone: "3423432"
      },
      {
        id: 3,
        name: "C",
        email: "c@d.com",
        phone: "242354464"
      }
    ];
    return tempUsers;
  }
}

// http://localhost:3000/graphql 
app.use('/graphql', graphqlHTTP({
  schema: schema, // Schema is not properly setup for this
  rootValue: root,
  graphiql: true // client interface for querying
}));
// GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries and doing mutations

app.listen(PORT, () => {
  console.log('GraphQL NodeJS App is running on http://localhost:3000/graphql');
});

