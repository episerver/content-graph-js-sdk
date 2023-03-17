const { NODE_ENV } = process.env
require("dotenv").config({
  path: `.env.${NODE_ENV}`,
})

const { OPTIQ_URL, OPTIQ_AUTH } = process.env
console.log({ NODE_ENV, OPTIQ_URL, OPTIQ_AUTH })

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
        url: `${OPTIQ_URL}/content/v2`,
        headers: {
          Authorization: `epi-single ${OPTIQ_AUTH}`,
        },
      },
    },
  ],
};
