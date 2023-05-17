import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';
import DeleteIcon from '../Icons/DeleteIcon';
import ImagePicker from '../Icons/ImagePicker';

export default function EditPage() {

    const location = useLocation()
    const id = location.pathname.split("/")[4];
  
    const [data,setData] = useState({})
    const [selectedImg,setSelectedImg] = useState("")
    const [values,setValues] = useState({
        username: "",
        img: "",
        address:"",
        password: "",
        confirmPassword: "",
      })

      useEffect(()=>{
        axios.get(`api/users/find/${id}`).then((res)=>{
            setData(res.data)
        })
    })
    const inputs = [
        {
          id:1,
          name:"username",
          type:"text",
          placeholder: "Username",
          errorMessage:"Username Should be 6 -16 characters and shouidn't include special character! ",
          label : "Username",
          pattern: "^[a-zA-Z0-9]{6,16}$",
          required:true,
          defaultValue:data.username
        },
        {
          id:2,
          name:"address",
          type:"text",
          placeholder: "Address",
          label : "Address",
          errorMessage : "this field is required!",
          required:true,
          defaultValue:data.address
        }
     
      ]

      const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
  const fnData = Object.fromEntries(data)
console.log(e);
  const user = await axios.put(`/api/users/${id}`,fnData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  setIsUser(user)
  setValues("")
      
      }
      
      const onChange = (e)=>{
        
        setValues({...values,[e.target.name]:e.target.value})
      }  

      const handleCreateBase64 = useCallback(async (e) => { 
        const file = e.target.files[0];
        setValues({...values,[e.target.image]:e.target.image})
        const base64 = await convertToBase64(file);
        setSelectedImg(base64);
        
},[])

const convertToBase64 = (file) => {

  return new Promise((resolve, reject) => { 
    const fileReader = new FileReader();
  
  if (!file) { alert("Please select an image");
  
  } else {
  
  fileReader.readAsDataURL(file);
  
  fileReader.onload = () => {
  
  resolve(fileReader.result);
  
  };
  
  }
  
  fileReader.onerror = (error) => { reject (error);
  }
});
}

const deleteImage =(e) => { 

  e.preventDefault();
  
  setSelectedImg(null);
  
  };
  return (
    <div className='flex flex-col bg-white shadow-md p-4 w-2/3'>
      <h1 className='my-4 text-4xl text-gray-500 font-bold'>Edit Profile</h1>
          <form className='form ' onSubmit={handleSubmit}>
            <div className='flex  p-6 mb-3'>
          <div className='w-1/3'>   
      {selectedImg ? (<><img src={selectedImg}/>  <button onClick={deleteImage} className='bg-red-500 text-white p-2'>
        <DeleteIcon/></button></>) :
        (<label className='my-4 ml-4  p-4' htmlFor="image">
          {data.image ? (<img className='w-50 h-50' src={`http://localhost:5000/uploads/${data.image}`} alt="img"/>) : <ImagePicker /> }
        <input type="file" name="image"  hidden id='image' onChange={onChange}/>
        </label>)
}
      </div>
            <div className='bg-gray-200 p-3 w-full'>
      {inputs.map((input)=>(

        <Form key={input.id} {...input}  onChange={onChange}/>
      ))
        
      }
      </div>
      </div>
     
      <button className='bg-green-500 p-3'>Update</button>
    
     </form>
    </div>
  )
}

