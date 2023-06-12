import { graphql } from "gatsby"
import React from "react"
import { Banner } from "../components/banner"
import { BiographyList } from "../components/biography-list"
import { Layout } from "../components/layout"
import { BiographyPreview } from "../models/biography"

type IndexProps = {
  data: {
    optimizely: {
      BiographyPage: BiographyPreview[]
    }
  }
}

const Index: React.FC<IndexProps> = ({
  data: {
    optimizely: { BiographyPage }
  },
}) => {
  return (
    <Layout>
      <Banner />
      <BiographyList biographies={BiographyPage} />
    </Layout>
  )
}
export default Index

export const pageQuery = graphql`
  query {
    optimizely {
      BiographyPage(
        locale: [en]
      ) {
        Name
        MainBody
        RouteSegment
        FamousQuote
        Born
        Die
      }
    }
  }
`
