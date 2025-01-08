import React from 'react'

export function Table({ children, ...props }) {
  return <table {...props} className={`w-full ${props.className || ''}`}>{children}</table>
}

export function TableHeader({ children, ...props }) {
  return <thead {...props}>{children}</thead>
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>
}

export function TableRow({ children, ...props }) {
  return <tr {...props}>{children}</tr>
}

export function TableHead({ children, ...props }) {
  return <th {...props} className={`px-4 py-2 text-left ${props.className || ''}`}>{children}</th>
}

export function TableCell({ children, ...props }) {
  return <td {...props} className={`px-4 py-2 ${props.className || ''}`}>{children}</td>
}