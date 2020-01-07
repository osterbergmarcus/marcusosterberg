/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faMedium,
  faCodepen,
} from '@fortawesome/free-brands-svg-icons';
import { colors } from '../styles';

import { rhythm } from '../utils/typography';

const socials = [
  {
    url: `https://twitter.com/osterbergmarcus`,
    icon: faTwitter,
  },
  {
    url: `https://www.linkedin.com/in/marcus-österberg-3840a5189`,
    icon: faLinkedin,
  },
  {
    url: `https://medium.com/@osterberg`,
    icon: faMedium,
  },
  {
    url: `https://github.com/osterbergmarcus`,
    icon: faGithub,
  },
  {
    url: `https://codepen.io/osterbergmarcus`,
    icon: faCodepen,
  },
];

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <>
      <div
        style={{
          display: `flex`,
          flexDirection: 'row',
        }}
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
            width: '80px',
            height: '80px',
          }}
          imgStyle={{
            borderRadius: `50%`,
            width: '100px',
            height: '100px',
          }}
        />
        <p style={{ flex: 1, fontSize: '20px' }}>
          Swedish. Developer. Learner. I like software engineering. Sometimes I
          publish articles about the web and mobile platform. <br />
          On a snowy day you find me in the mountains riding my snowboard{' '}
          <span role="img">🏔</span>
        </p>
      </div>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
          listStyleType: 'none',
          marginBottom: '0',
          justifyContent: 'center',
        }}
      >
        {socials.map(social => (
          <li
            style={{
              marginRight: '8px',
            }}
            key={social.url}
          >
            <a href={social.url} target="_new" style={{ boxShadow: 'none' }}>
              <FontAwesomeIcon
                icon={social.icon}
                color={colors.primary}
                size="lg"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Bio;
