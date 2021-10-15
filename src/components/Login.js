import React,{ useState }  from 'react'
import { NavLink , useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = ()=>{
    const history = useHistory()
    const [user , setUser] = useState({
         email:"", password:"",
        })
      
        let name , value;
        const handleInputs = (e)=>{
          console.log(e)
          name= e.target.name;
          value = e.target.value;
      
          setUser({...user , [name]:value})

        }


        const validationSchema = Yup.object().shape({

          email: Yup.string()
              .required('Email is required')
              .email('Email is invalid')
              .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          password: Yup.string()
              .required('Password is required')
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
      
      const { register, handleSubmit, formState } = useForm(formOptions);
          const { errors } = formState;

     const login = async (e)=>{
        e.preventDefault();
        const {email , password } = user;
        const res = await fetch("http://localhost:4000/login", {
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify({
            email:email , password:password,
          })
        })
        const data = await res.json();
        localStorage.setItem('token',data.token)
        localStorage.setItem('email',data.userExits.email)
        console.log(data)
    
        if(res.status === 400 || !data  ){
          swal({
            title: "Error!",
            text: "Enter Email and Password",
            icon: "warning",
            timer: 2000,
            button: false
          })
          console.log("Enter Email and Password")
        }
        if (res.status === 422 || !data  ){
          swal({
            title: "Error!",
            text: "user not Found",
            icon: "warning",
            timer: 2000,
            button: false
          })
          
          console.log("Invalid Email Or Password")
        
        }
        else{
          swal({
            title: "Done!",
            text: "User Login Succesfully",
            icon: "success",
            timer: 2000,
            button: false
          })
          console.log("Login Successfully")
    
          history.push("/about");
        }
        }
    return( 
        <div className="login" >
            <div className="container mt-5">
                <div className="login-content">
                    <div className="login-form">
                        
                        <form className="login-form" id="login-form" onSubmit={handleSubmit(login)} >
                        <h2 className="form-title">Login</h2>
                            <div className="form-group">
                                <label htmlFor="email">
                                <i className="zmdi zmdi-email material-icons-name p-2"></i>
                                </label>
                                <input type="text" name="email" {...register('email')} value={user.email} onChange={handleInputs} id="email" autoComplete="off" placeholder="Your Email" required></input>
                                <br></br><span>{errors.email?.message}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                <i className="zmdi zmdi-lock material-icons-name p-2"></i>
                                </label>
                                <input type="password" name="password" {...register('password')}  value={user.password} onChange={handleInputs}s id="password" autoComplete="off" placeholder="Your password" required></input>
                                <br></br><span>{errors.password?.message}</span>
                            </div>


                            <div className="form-group form-button">
                                <input type="submit" name="login" onClick={login} id ="login" className="form-submit" value="Login"></input>
                            </div>

                            <div className="form-group">
                                <NavLink to="/signup" >I Don't have Account</NavLink>
                            </div>
                        </form>

                    </div>
                    
                </div>

            </div>
        </div>
    )
}


export default Login