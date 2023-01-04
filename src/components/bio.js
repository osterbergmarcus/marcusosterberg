/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faMedium,
  faCodepen,
} from '@fortawesome/free-brands-svg-icons'

const socials = [
  {
    url: `https://twitter.com/osterbergmarcus`,
    icon: faTwitter,
  },
  {
    url: `https://www.linkedin.com/in/marcus-j-%C3%B6sterberg-3840a5189/`,
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
]

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <>
      <div className="avatar">
        <StaticImage
          style={{
            minWidth: 50,
            borderRadius: `100%`,
            width: '100px',
            height: '100px',
            marginRight: '16px',
            marginBottom: '16px',
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../images/profile-pic.jpeg"
          quality={95}
          alt="Profile picture"
        />
        <p
          style={{
            flex: 1,
            fontSize: '18px',
          }}
        >
          Self-taught. Engineering Manager. Remote Leadership.
          <br />
          On a snowy day you find me in the mountains riding my snowboard{' '}
          <span role="img">🏔</span>
          <br />
          Read more{' '}
          <Link to="/about" itemProp="url">
            about me
          </Link>
        </p>
      </div>
      <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: 0 }}>
        <strong>You also find me at</strong>
      </p>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
          listStyleType: 'none',
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
              style={{ boxShadow: 'none' }}
              aria-label={`link to ${social.url}`}
            >
              <FontAwesomeIcon icon={social.icon} color="#2A5F5B" size="lg" />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Bio
