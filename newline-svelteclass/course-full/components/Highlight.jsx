import React from "react";

export default function Highlight({ children, color, text = '#fff' }) {
    return (<span style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: text,
        padding: '0.2rem',
        boxDecorationBreak: 'clone',
        display: 'inline-block',
    }}> {children} </span>)
};