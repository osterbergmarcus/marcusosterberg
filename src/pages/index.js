import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import NavBar from "../components/navbar"
import Video from "../components/video"

// TODO clean this up when pulling data from medium works with gatsby-source-medium plugin
const extContent = [
  {
    title: "Guide To Hire A React Developer",
    description:
      "Finding the right developer for a specific job can be time consuming and expensive. Managing code assignments and asking the right questions is difficult. This is my guide on how to to asses the technical skills of a candidate.",
    date: "Sep 18, 2020",
    url: "https://medium.com/@Osterberg/guide-to-hire-a-react-developer-170b19f320f6",
  },
  {
    title: "Native vs React Native — The Similarities And Differences",
    description:
      "Should I build a native app or use cross platform frameworks? There is no absolute answer to this question.",
    date: "Feb 06, 2020",
    url: "https://medium.com/@Osterberg/native-vs-react-native-8854abbee0b5",
  },
  {
    title: "Why Does React Components Re-Render",
    description: "Best practices for how to avoid pointless re-renders.",
    date: "Feb 02, 2019",
    url: "https://medium.com/@Osterberg/react-component-renders-too-often-2917daabcf5",
  },
  {
    title: "React Native Performance Optimization and Profiling",
    description: "How to profile and optimize React Native performance",
    date: "Mar 24, 2018",
    url: "https://medium.com/@Osterberg/react-native-performance-optimization-and-profiling-5b586e9018f8",
  },
  {
    title: "JavaScript Concepts For Beginners",
    description:
      "This article is a collection of JavaScript fundamentals and gotchas. I also share some of my thoughts about the language and eco system based on my personal experience.",
    date: "Sep 13, 2016",
    url: "https://medium.com/@Osterberg/oneyearwithjavascript-d55ffcf89d3d",
  },
  {
    title: "JavaScript Higher-order Functions",
    description:
      "Learn about callbacks and higher order functions in JavaScript",
    date: "May 10, 2016",
    url: "https://medium.com/@Osterberg/can-i-callback-32e188015b85",
  },
  {
    title: "JavaScript This Keyword Explained",
    description:
      "Get rid of all the scooping errors, lets learn about how we refer to the context object in JavaScript with the keyword this.",
    date: "May 05, 2016",
    url: "https://medium.com/@Osterberg/which-context-is-this-47fdb20650d2",
  },
  {
    title: "JavaScript Prototypes For Beginners",
    description:
      "JavaScript is a prototype-based language. Lets deconstruct the definition of prototypes in JavaScript.",
    date: "Apr 29, 2016",
    url: "https://medium.com/@Osterberg/prototypes-is-a-scary-word-f3376a9dce4c",
  },
  {
    title: "JavaScript Closure Example",
    description:
      "I want to share how I started to understand Closures in JavaScript. This is a beginner friendly view with a simple example. Closures is a function wrapped inside of a functions body that can be referenced to its scope chain e.g. outer variables.",
    date: "Apr 26, 2016",
    url: "https://medium.com/@Osterberg/closures-are-awesome-and-confusing-772845522531",
  },
]

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
        <h3 id="talks">Talks I did</h3>
        <ol style={{ listStyle: `none`, paddingBottom: 8 }}>
          <li>
            <Video
              title="Mobile Applications with JavaScript"
              src="https://www.youtube.com/embed/eor_4s2iZnU"
            />
          </li>
        </ol>
        <h3 id="interviews">My interviews</h3>
        <ol style={{ listStyle: `none`, paddingBottom: 8 }}>
          <li>
            <Article
              title="An Anecdotal Guide to Pivoting Into Software Engineering"
              url="https://codesubmit.io/blog/software-engineering-career-switch/"
              date="Sep 18, 2022"
              description="Switching career paths is often messy and uncertain. It takes hard work, grit, and a lot of time for individuals to successfully break into a new field. Here's how three people did just that."
            />
          </li>
        </ol>
        <h3 id="posts">What I wrote</h3>
        <ol style={{ listStyle: `none` }}>
          {extContent.map((content, index) => (
            <li key={index}>
              <Article
                title={content.title}
                url={content.url}
                date={content.date}
                description={content.description}
              />
            </li>
          ))}
        </ol>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <Article
                  title={title}
                  slug={post.fields.slug}
                  date={post.frontmatter.date}
                  description={post.frontmatter.description || post.excerpt}
                />
              </li>
            )
          })}
        </ol>
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
export const Head = () => <Seo title="Home" />

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
