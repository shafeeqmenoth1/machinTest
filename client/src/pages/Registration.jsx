
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import ImagePicker from '../Icons/ImagePicker';
import Login from './Login';


function Registration() {
const [isUser,setIsUser] = useState({})

  const [values,setValues] = useState({
    username: "",
    image: "",
    address:"",
    password: "",
    confirmPassword: "",
  })
    

  const LoginIputs = [
    {
      id:1,
      name:"username",
      type:"text",
      placeholder: "Username",
      errorMessage:"Username Should be 6 -16 characters and shouidn't include special character! ",
      label : "Username",
      pattern: "^[a-zA-Z0-9]{6,16}$",
      required:true
    },
    {
      id:2,
      name:"address",
      type:"text",
      placeholder: "Address",
      errorMessage:"Address is required ",
      label : "Address",
     
      required:true
    },
  
    {
      id:3,
      name:"password",
      type:"password",
      placeholder: "Password",
      errorMessage : "Password should be 6-16 characters and include at leat 1 letter, 1 number and 1 special character! ",
      label : "Password",
      pattern : `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,16}`,
      required:true

    },
    {
      id:4,
      name:"confirmPassword",
      type:"password",
      placeholder: "Confirm Password",
      errorMessage : "Password dont't match!",
      label : "Confirm Password",
      pattern:values.password,
      required:true

    },

  ]

const handleSubmit = async(e)=>{
  e.preventDefault()
 
  const data = new FormData(e.target)
  const fnData = Object.fromEntries(data)

  const user = await axios.post("/api/auth/register",fnData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  setIsUser(user)
  setValues({})
}

const onChange = (e)=>{
  setValues({...values,[e.target.name]:e.target.value})
}   

  return (
 
    <div className='flex flex-col bg-white shadow-md p-4 w-1/3'>
      <h1 className='my-4 text-4xl text-gray-500 font-bold'>Register here</h1>
     <form  enctype="multipart/form-data"  className=' flex flex-col' onSubmit={handleSubmit}>
     {LoginIputs.map((input)=>(

        <Form key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
        ))}
        <label className='my-4 ml-4 border p-4 w-1/3' htmlFor="image">
          <ImagePicker/>
        <input type="file" name="image"  hidden id='image' onChange={onChange}/>
        </label>
          <button className='bg-green-500 p-3'>Submit</button>
    
      </form>
     <div className='p-2 mt-2'>Already registered ? 
    <Link  className='ml-2 text-blue-600' to='/login'>Login</Link>
    </div>
</div>
  );
}

export default Registration;
