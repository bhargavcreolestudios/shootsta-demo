import React from 'react'
import Home from './views/home'
import Upload from './views/upload'
import Stream from './views/Stream'

const routes = [
    {
      path: '/',
      exact:true,
      render:(props)=>{
          return(<Home {...props}/>)
      }
    },
    {
      path: '/upload',
      exact:true,
      render:(props)=>{
          return(<Upload {...props}/>)
      }
    },
    {
      path: '/streaming',
      exact:true,
      render:(props)=>{
          return(<Stream {...props}/>)
      }
    },
];

export default routes