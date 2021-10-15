import React, { useState }  from 'react'
import { NavLink , useHistory  } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUp =()=>{
  const history = useHistory();
  const [user , setUser] = useState({
  name :"" , email:"", phone:"", password:"", confirmPassword:"" 
  })

  let name , value;
  const handleInputs = (e)=>{
    console.log(e)
    name= e.target.name;
    value = e.target.value;

    setUser({...user , [name]:value})
  }

  const validationSchema = Yup.object().shape({

    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid')
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        
    phone: Yup.string()
        .required('Phone number is required')
        .min(10, 'Phone number must be 10 Digit')
        .max(10, 'Phone number must be 10 Digit'),
        
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;


  const PostData = async (e)=>{

    e.preventDefault();

    const {name , email , phone , password , confirmPassword} = user;

    const res = await fetch("https://backend-node-app.herokuapp.com/register", {
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify({
        name:name , email:email , phone:phone , password:password, confirmPassword:confirmPassword
      })
    })
    const data = await res.json();
    

    if (res.status === 422 || !data  ){
      swal({
        title: "Error!",
        text: "Invalid",
        icon: "warning",
        timer: 2000,
        button: false
      })
      
      console.log("Invalid Registration")
    }
    else{
      swal({
        title: "Done!",
        text: "User Login Succesfully",
        icon: "success",
        timer: 2000,
        button: false
      })
      console.log("Registration Successfully")

      history.push("/login");
    }
  }

    return(
        <>

        <div className="signup" >
            <div className="container">
                <div className="sign-content">
                    
                        <form className="signup-form" id="register-form" onSubmit={handleSubmit(PostData)}>
                        <h2 className="form-title">SignUp</h2>
                            <div className="form-group">
                                <label htmlFor="name">
                                <i className="zmdi zmdi-account material-icons-name p-2"></i>
                                </label>
                                <input type="text" name="name" {...register('name')} value={user.name} onChange={handleInputs} id="name" autoComplete="off" placeholder="Your Name"></input>
                                <br></br><span>{errors.name?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name p-2"></i>
                                </label>
                                <input type="text" name="email" {...register('email')} value={user.email} onChange={handleInputs} id="email" autoComplete="off" placeholder="Your Email"></input>
                                <br></br><span>{errors.email?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">
                                <i className="zmdi zmdi-phone-in-talk material-icons-name p-2"></i>
                                </label>
                                <input type="text" name="phone" {...register('phone')} value={user.phone} onChange={handleInputs} id="phone" autoComplete="off" placeholder="Your Phone"></input>
                                <br></br><span>{errors.phone?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name p-2"></i>
                                </label>
                                <input type="password" name="password" {...register('password')} value={user.password} onChange={handleInputs} id="password" autoComplete="off" placeholder="Your password"></input>
                                <br></br><span>{errors.password?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">
                                <i className="zmdi zmdi-lock material-icons-name p-2"></i>
                                </label>
                                <input type="password" name="confirmPassword" {...register('confirmPassword')} value={user.confirmPassword} onChange={handleInputs} id="confirmPassword" autoComplete="off" placeholder="Your Confirm password"></input>
                                <br></br><span>{errors.confirmPassword?.message}</span>
                            </div>

                            <div className="form-group form-button">
                                <input type="submit"  id ="signup" className="form-submit" value="Register"></input>
                            </div>

                            <div className="form-group">
                                <NavLink to="/login" >I am already Register</NavLink>
                            </div>
                        </form>

                    </div>
                    
                </div>

            </div>
      </>


    )
    }



export default SignUp