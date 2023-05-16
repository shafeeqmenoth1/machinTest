import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function ViewPage() {
    const [data,setData] = useState({})
    const location = useLocation()
  const id = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[1];

    useEffect(()=>{
        axios.get(`api/users/find/${id}`).then((res)=>{
            setData(res.data)
        })
    })
  return (
    <div className='flex w-2/4 bg-white shadow-md rounded-md overflow-hidden'>
      <div childre><img className='overflow-hidden' src={`http://localhost:5000/uploads/${data.image}`} alt="" /></div>
      <div className='w-full'>
        <div className='bg-gray-100 w-full p-3 text-center'>
          <h2 className='text-3xl font-bold'>{data.username}</h2>
        </div>
        <div className='mt-2'>
          <h2 className='font-bold'>Address: <span className='font-light'>{data.address}</span></h2>
        </div>
       
      </div>
       
        
     
    </div>
  )
}

export default ViewPage