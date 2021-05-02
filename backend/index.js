const { ApolloServer } = require("apollo-server");
const price = require("./query/price");
const summaryDetail = require("./query/summaryDetail");
const history = require("./query/history");
const earnings = require("./query/earnings");
const queries = require("./query/queries");

const typeDefs = [
  queries,
  price.typeDefs,
  summaryDetail.typeDefs,
  history.typeDefs,
  earnings.typeDefs,
];
const resolvers = [
  price.resolvers,
  summaryDetail.resolvers,
  history.resolvers,
  earnings.resolvers,
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
