import React from 'react'
import NavBar from '../components/Header';
import { Outlet } from 'react-router'

function WithNav() {
  return (
      <>
        <NavBar />
        <Outlet />
      </>
  )
}

export default WithNav