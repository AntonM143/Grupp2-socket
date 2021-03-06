import React from 'react'

const Layout = (props) => {
  return (
    <div className="flex w-screen h-screen bg-gray-800">
      {props.children}
    </div>
  )
}

export default Layout
