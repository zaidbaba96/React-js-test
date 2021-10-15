import React, { useState , useEffect } from 'react'
import swal from 'sweetalert';
import './home.css'
const Home = ()=>{
    
    const [userData , setUserData] = useState({});
    useEffect (()=>{
       
        const callAboutPage = async () => {
    
            try{
                const res = await fetch('https://backend-node-app.herokuapp.com/getdata',{
                   // mode:"no-cors",
                    method:"GET",
                    headers:{
                        'x-access-token': localStorage.getItem('token')
                    },
                    credentials : "include"
                });
                
                const data = await res.json()
                console.log(data)
                setUserData(data)   
    
               
                if(res.status !== 200){
                    swal({
                        title: "Error!",
                        text: "user not Found",
                        icon: "warning",
                        timer: 2000,
                        button: false
                      })
                    const error = new Error(res.error);
                    throw error;
                    
                }
                else{
                   console.log("Success")
                }
        }
            catch(err){
                console.log(err)
        }
        };
        callAboutPage();
        },[]);

    return(
        <div className="home-page">
            <div className="home-div">
            <h1>{userData.name}</h1>
            <p>WELCOME </p>
            <h2>We are MERN Devloper</h2>
            </div>
        </div>
    )
}


export default Home