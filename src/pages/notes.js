import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import NavBar from "../components/navbar"

const Article = ({ title, url, date, description, slug }) => (
  <article
    className="post-list-item"
    itemScope
    itemType="http://schema.org/Article"
  >
    <header>
      <h2>
        {slug ? (
          <Link to={slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        ) : (
          <Link target="_new" to={url} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        )}
      </h2>
      <small>{date}</small>
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        itemProp="description"
      />
    </section>
  </article>
)

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <>
      <NavBar />
      <Layout location={location} title={siteTitle}>
        <Bio />
        <section>
          <h3>Notes from books that I've read</h3>
          <p>
            Writing things down improves memory and allows me to share what I've
            learned. This is a collection of important or interesting notes from
            books I've read over the years.
            <br />
            Click on a book to see the full details.
            <br />
          </p>
        </section>

        <h3 id="posts">All book notes</h3>
        <p>coming soon...</p>
      </Layout>
      <div
        style={{
          height: "2rem",
          left: "0px",
          bottom: "0px",
          right: "0px",
          backgroundColor: "black",
        }}
      />
    </>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Book notes" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
