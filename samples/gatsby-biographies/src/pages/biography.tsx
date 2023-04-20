import { Redirect } from "@reach/router"
import { graphql } from "gatsby"
import React from "react"
import { Layout } from "../components/layout"
import { Biography } from "../models/biography"
import styles from "./biography.module.css"

type BiographyProps = {
  data: {
    optimizely: {
      BiographyPage: Biography[]
    }
  }
}

const BiographyPage: React.FC<BiographyProps> = ({
  data: {
    optimizely: { BiographyPage },
  },
}) => {
  const biography = BiographyPage.pop()

  return biography ? (
    <Layout>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <img className={styles.bioImage} src={`../images/${biography.RouteSegment}.jpg`} />
        </div>

        <div className={styles.facts}>
          <div>Birth Date</div>
          <div>{biography.Born}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: biography.MainBody,
          }}
        />
      </div>
    </Layout>
  ) : (
    <Redirect to="/404"></Redirect>
  )
}
export default BiographyPage

export const pageQuery = graphql`
  query BiographyQuery($route: String!) {
    optimizely {
      
        BiographyPage(
          where: {
            RouteSegment: {
              eq: $route
            }
          }
          locale: [en]
        ) {
          Name
          RouteSegment
          FamousQuote
          Born
          Die
          MainBody
        }
      
    }
  }
`
