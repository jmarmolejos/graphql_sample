const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')

const fetchRatesData = async () => {
  const rates = await fetch('http://jsonvat.com');
  return rates.json()
}

const mapRate = rate => ({
  name: rate.name,
  code: rate.code,
  taxRate: rate.periods[0].rates.standard
})

const getRates = async () => {
  const ratesJson = await fetchRatesData()

  return ratesJson.rates.map(rate => ({
    name: rate.name,
    code: rate.code,
    taxRate: rate.periods[0].rates.standard
  }));
}

const getRate = async ({code}) => {
  const ratesJson = await fetchRatesData()

  return ratesJson.rates.filter(rate => rate.code === code).map(mapRate)[0];
}

const root = {
  vats: getRates,
  vat: getRate
};

const schema = buildSchema(`
  type VatItem {
    name: String
    code: String
    taxRate: Float
  },

  type Query {
    message: String
    vats: [VatItem]
    vat(code: String!): VatItem
  }
`);

module.exports = async (app) => {
  app.use('/gql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  }));
};
