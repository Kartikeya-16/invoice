import React from 'react'

export function Separator({ className, ...props }) {
  return (
    <div
      className={`h-[1px] w-full bg-gray-200 my-2 ${className}`}
      role="separator"
      {...props}
    />
  )
}

