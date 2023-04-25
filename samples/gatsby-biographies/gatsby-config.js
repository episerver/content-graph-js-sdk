const { NODE_ENV } = process.env
require("dotenv").config({
  path: `.env.${NODE_ENV}`,
})

const { CONTENT_GRAPH_URL, CONTENT_GRAPH_AUTH } = process.env
console.log({ NODE_ENV, CONTENT_GRAPH_URL, CONTENT_GRAPH_AUTH })

module.exports = {
  siteMetadata: {
    title: "Optimizely Gatsby Demo",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Optimizely",
        fieldName: "optimizely",
        url: `${CONTENT_GRAPH_URL}/content/v2`,
        headers: {
          Authorization: `epi-single ${CONTENT_GRAPH_AUTH}`,
        },
      },
    },
  ],
};
