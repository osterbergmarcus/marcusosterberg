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
          marginBottom: rhythm(1),
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
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <p>
          Swedish. I like to create and learn. Here you find me sharing my
          thoughts and knowledge when I'm not busy snowboarding{' '}
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
            <a
              href={social.url}
              target="_new"
              style={{ boxShadow: 'none', hover: { color: 'red' } }}
            >
              <FontAwesomeIcon icon={social.icon} color="grey" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Bio;
