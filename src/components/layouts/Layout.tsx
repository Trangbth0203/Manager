import React from 'react'
import { Sidebar } from '~/src/components/widgets/Sidebar'
import { Header } from '~/src/components/widgets/Header'

export const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <Sidebar />
      <div className="container" style={{ transform: 'translate(7%, 80%)' }}>
        {children}
      </div>
    </div>
  )
}
