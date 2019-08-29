import React from 'react';

export function UnMatched({ location }) {
  return (
    <div className="container">
      <h3><code>{location.pathname} Not found</code></h3>
    </div>
  );
}