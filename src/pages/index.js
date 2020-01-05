import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Video from '../components/video';
import NavBar from '../components/NavBar';

// TODO clean this up when pulling data from medium works with gatsby-source-medium plugin
const extContent = [
  {
    title: 'Why Does React Components Re-Render',
    description:
      'Example of good practices for how to avoid pointless re-renders.',
    date: 'Feb 02, 2019',
    url:
      'https://medium.com/@Osterberg/react-component-renders-too-often-2917daabcf5',
  },
  {
    title: 'React Native Performance Optimization and Profiling',
    description: 'How to profile and optimize React Native performance',
    date: 'Mar 24, 2018',
    url:
      'https://medium.com/@Osterberg/react-native-performance-optimization-and-profiling-5b586e9018f8',
  },
  {
    title: 'One Year Of JavaScript In Fifteen Min',
    description:
      'Sharing my thoughts and key takeaways from developing with JavaScript for one year',
    date: 'Sep 13, 2016',
    url: 'https://medium.com/@Osterberg/oneyearwithjavascript-d55ffcf89d3d',
  },
  {
    title: 'Async JavaScript With Higher Order Functions',
    description:
      'Learn about callbacks and higher order functions in JavaScript',
    date: 'May 10, 2016',
    url: 'https://medium.com/@Osterberg/can-i-callback-32e188015b85',
  },
  {
    title: 'The Context Of This',
    description:
      'Get rid of all the scooping errors, lets learn about how we refer to the context object in JavaScript with the keyword this.',
    date: 'May 05, 2016',
    url: 'https://medium.com/@Osterberg/which-context-is-this-47fdb20650d2',
  },
  {
    title: 'Don’t Fear JavaScript Prototypes',
    description:
      'JavaScript is a prototype-based language. Lets deconstruct the definition of prototypes in JavaScript',
    date: 'Apr 29, 2016',
    url:
      'https://medium.com/@Osterberg/prototypes-is-a-scary-word-f3376a9dce4c',
  },
  {
    title: 'Closures are awesome and confusing',
    description:
      'I want to share how I started to understand Closures in JavaScript. This is a beginner friendly view with a simple example. Closures is a…',
    date: 'Apr 26, 2016',
    url:
      'https://medium.com/@Osterberg/closures-are-awesome-and-confusing-772845522531',
  },
];

const Article = ({ title, slug, date, description, url }) => {
  return (
    <article key={slug}>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          {slug ? (
            <Link style={{ boxShadow: `none` }} to={slug}>
              {title}
            </Link>
          ) : (
            <a href={url} target="_new" style={{ boxShadow: 'none' }}>
              {title}
            </a>
          )}
        </h3>
        <small>{date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </section>
    </article>
  );
};

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <>
        <NavBar />
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="All posts" />
          <Bio />
          <h3>Talks</h3>
          <Video
            title="Mobile Applications with JavaScript"
            src="https://www.youtube.com/embed/eor_4s2iZnU"
          />
          <h3>Posts</h3>
          {extContent.map(content => (
            <Article
              key={content.title}
              title={content.title}
              url={content.url}
              date={content.date}
              description={content.description}
            />
          ))}
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Article
                key={title}
                title={title}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                description={node.frontmatter.description}
              />
            );
          })}
        </Layout>
      </>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
  }
`;
