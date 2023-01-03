import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import NavBar from "../components/navbar"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <>
      <NavBar />
      <Layout location={location} title={siteTitle}>
        <h1>Hey, I'm Marcus</h1>
        <p>
          I'm a self-taught Software Engineer with remote leadership skills and
          experience in developing high-performing teams. <br />
          I've 12+ years working experience in the IT industry.
          <br />
          <br />
          Currently modernizing health care in Germany at{" "}
          <Link to="https://www.teleclinic.com" target="_new" itemProp="url">
            TeleClinic
          </Link>
          .
          <br />
          <br />
          Former Software Engineer at{" "}
          <Link to="https://www.internations.org" target="_new" itemProp="url">
            InterNations
          </Link>
          , replaced iOS/Android native mobile application with cross-platform
          technology using React-Native.
          <br />
          <br />
          Before my journey as a software engineer I did 5+ years of IT
          consultancy focusing on 2nd & 3rd line customer support and project
          management.
          <br />
          <br />
          Things I like, growing and scaling engineering teams, building web
          applications with{" "}
          <Link to="https://elixir-lang.org/" target="_new" itemProp="url">
            Elixir
          </Link>
          , perfect UX and snowboarding.
        </p>
        <p>
          You find me on{" "}
          <Link
            to="https://twitter.com/osterbergmarcus"
            target="_new"
            itemProp="url"
          >
            twitter
          </Link>
          ,{" "}
          <Link
            to="https://www.linkedin.com/in/marcus-j-%C3%B6sterberg-3840a5189/"
            target="_new"
            itemProp="url"
          >
            linkedin
          </Link>
          ,{" "}
          <Link to="https://medium.com/@osterberg" target="_new" itemProp="url">
            medium
          </Link>
          ,{" "}
          <Link
            to="https://github.com/osterbergmarcus"
            target="_new"
            itemProp="url"
          >
            github
          </Link>
          ,{" "}
          <Link
            to="https://codepen.io/osterbergmarcus"
            target="_new"
            itemProp="url"
          >
            codepen
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default About

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="About" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
