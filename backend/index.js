const { ApolloServer } = require("apollo-server");
const price = require("./query/price");
const summaryDetail = require("./query/summaryDetail");
const history = require("./query/history");
const earnings = require("./query/earnings");
const queries = require("./query/queries");
const autoComplete = require("./query/autoComplete");
const recommendations = require("./query/recommendations");
const dividendHistory = require("./query/dividendHistory");
const calendarEvents = require("./query/calendarEvents");

const typeDefs = [
  queries,
  price.typeDefs,
  summaryDetail.typeDefs,
  history.typeDefs,
  earnings.typeDefs,
  autoComplete.typeDefs,
  recommendations.typeDefs,
  dividendHistory.typeDefs,
  calendarEvents.typeDefs,
];
const resolvers = [
  price.resolvers,
  summaryDetail.resolvers,
  history.resolvers,
  earnings.resolvers,
  autoComplete.resolvers,
  recommendations.resolvers,
  dividendHistory.resolvers,
  calendarEvents.resolvers,
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
