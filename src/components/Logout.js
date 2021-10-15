import React, {useEffect} from "react";
import {useHistory } from 'react-router-dom'
import swal from 'sweetalert';

const Logout = ()=>{
    const history = useHistory()
    
    useEffect (()=>{
      
        const callAboutPage = async () => {
    
            const z = localStorage.clear();
                    swal({
                        title: "Success",
                        text: "user logout Successfully",
                        icon: "success",
                        timer: 2000,
                        button: false
                      })
                      history.push("/login");
                    console.log(z)
                   console.log("Success")
        };
        callAboutPage();
        },[]);
    return(
        <>
        </>
    )
}


export default Logout