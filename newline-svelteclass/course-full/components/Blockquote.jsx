import React from 'react';

export default function Blockquote({ children }) {
  return (
    <blockquote style={{ display: "block", fontWeight: "200", background: 'none', padding: '.5rem 1rem', borderLeft: '6px solid gray', borderRadius: '0' }}>
      {children}
    </blockquote>
  )
}
