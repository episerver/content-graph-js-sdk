const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
  {
    optimizely {
      BiographyPage(locale: [en]) {
        Name
        RouteSegment
        FamousQuote
        Born
        Die
      }
      BookNode{
        Name
        Code
        NodeDescription
        ContentLink {
            Id
            WorkId
            ProviderName
            Url
            GuidValue
        }
        ParentLink {
            Id
            WorkId
            GuidValue
            ProviderName
            Url
        }
      }
      BookProduct {
        Name
        Code
        Author
        Description
        DisplayName
        Url
        Status
        Publisher
        ContentLink {
            GuidValue
            Id
            ProviderName
            Url
            WorkId
        }
        ParentLink {
            GuidValue
            Id
            ProviderName
            Url
            WorkId
        }
      }
  }
}  
  `)

  console.log(result)

  if (result.errors) {
    throw result.errors
  }

  result.data.optimizely.BiographyPage.forEach(({ RouteSegment }) => {
    createPage({
      path: `biography/${RouteSegment}`,
      component: path.resolve(`./src/pages/biography.tsx`),
      context: {
        route: RouteSegment
      }
    })
  })

  result.data.optimizely.BookNode.forEach(({Code, ContentLink}) => {
    createPage({
      path: `bookStore/${Code}`,
      component: path.resolve(`./src/pages/bookProduct.tsx`),
      context: {
        parentLinkId: ContentLink.Id
      }
    })
  })

}
