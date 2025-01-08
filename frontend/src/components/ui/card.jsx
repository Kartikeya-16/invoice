import React from 'react'

export function Card({ children, ...props }) {
  return <div {...props} className={`bg-white shadow rounded-lg ${props.className || ''}`}>{children}</div>
}

export function CardHeader({ children, ...props }) {
  return <div {...props} className={`px-6 py-4 border-b ${props.className || ''}`}>{children}</div>
}

export function CardContent({ children, ...props }) {
  return <div {...props} className={`px-6 py-4 ${props.className || ''}`}>{children}</div>
}

export function CardTitle({ children, ...props }) {
  return <h2 {...props} className={`text-xl font-semibold ${props.className || ''}`}>{children}</h2>
}