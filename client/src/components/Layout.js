import React from 'react'

const Layout = (props) => {
  return (
    <div className="bg-gray-800 w-screen h-screen overflow-x-auto">
      {props.children}
    </div>
  )
}

export default Layout
