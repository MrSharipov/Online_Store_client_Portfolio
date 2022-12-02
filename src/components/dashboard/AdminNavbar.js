import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <ul className='flex gap-4'>
        <Link to="/products"><li className='border border-primary p-2 rounded menuHover'>All products</li></Link>
        <Link to="/addproduct"><li className='border border-primary p-2 rounded menuHover'>New product</li></Link>
        <Link to="/addcategory"><li className='border border-primary p-2 rounded menuHover'>New category</li></Link>
        <Link to="/edituser"><li className='border border-primary p-2 rounded menuHover'>Edit User</li></Link>
    </ul>
  )
}

export default AdminNavbar