import React,{ useEffect,useState  }  from 'react'
import dp from '../images/dp.jpg';
//import meme from '../images/meme.jpg';
//import edit from '../images/edit.jpg';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import { Controller } from 'react-hook-form';
const About = ()=>{
    const history = useHistory();
    const [userData , setUserData]= useState({})
    const [user , serUser] = useState ({email : localStorage.getItem('email'), imgs:''});

    // useEffect(()=>{
    //     callAboutPage();
    // },[user])
   
   
       
    const callAboutPage = async () => {

        try{
            const res = await fetch('https://nodejsbackend-test.herokuapp.com/about',{
               // mode:"no-cors",
                method:"GET",
                headers:{
                    'x-access-token': localStorage.getItem('token')
                },
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
                // const error = new Error(res.error);
                // throw error;
                
            }
            else{
                swal({
                    title: "Done!",
                    text: "User Login Succesfully",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
            }
    }
        catch(err){
            console.log(err)
            history.push('/login');
    }
    };
    useEffect (()=>{
    callAboutPage();
    },[user]);

    const handlaeChange = (e) =>{
        const img = e.target.files[0];
        console.log({imgs:img})
        const formData = new FormData();
        const z = formData.append('email' , localStorage.getItem('email'));
        const y = formData.append('img' , img);
        setUserData({imgs:y})

        const option ={
            method: 'POST',
            body: formData
        };
        callAboutPage()
        fetch("https://nodejsbackend-test.herokuapp.com/updateProfile", option);
        
    }

    return(

        <>
        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={`https://nodejsbackend-test.herokuapp.com/uploads/${userData.img}`} alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" onChange={handlaeChange} name="img"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                       {userData.name}
                                    </h5>
                                    <h6>
                                       {userData.work} 
                                    </h6>
                                    <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a className=" ml-4" href="https://www.linkedin.com/in/mansuri-zaid-52b84017a" target="_baba">LinkedIn</a><br></br>
                            <a className=" ml-4" href="https://instagram.com/zaid_baba?igshid=16ab93bm6tg3y" target="_baba">Instagram</a><br></br>
                            <a className=" ml-4" href="https://www.linkedin.com/in/mansuri-zaid-52b84017a" target="_baba">WhatAap</a><br></br>
                            <a className=" ml-4" href="https://www.linkedin.com/in/mansuri-zaid-52b84017a" target="_baba">Youtube</a><br></br>
                            <a className=" ml-4" href="https://www.linkedin.com/in/mansuri-zaid-52b84017a" target="_baba">Facebook</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">Node JS, React JS</a><br/>
                            <a href="">MongoDB</a><br/>
                            <a href="">MySQL</a><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>MERN Stack Devloper</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        
       
        </>
    )
}


export default About