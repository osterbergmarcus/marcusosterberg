import React from 'react';

const Video = ({ src, title }) => (
  <div
    style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '56.25%',
      marginTop: '60px',
    }}
  >
    <iframe
      src={src}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        border: '0px',
      }}
    />
  </div>
);

export default Video;
