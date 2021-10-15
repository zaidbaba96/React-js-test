import React ,{useEffect , useState} from 'react'
import swal from 'sweetalert';

const Contact = ()=>{

    const [userData , setUserData] = useState({name :"" , email:"" , phone:"" , message:""});

    useEffect (()=>{
       
        const userContract = async () => {
    
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
                setUserData({name:data.name , email:data.email , phone:data.phone , message:data.meaasasge})   
    
               
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
        userContract();
        },[]);

        const handleInput = (e) =>{
            const name = e.target.name;
            const value = e.target.value;
            
            setUserData({...userData , [name]:value})

        }

        const contractForm = async (e)=>{
            e.preventDefault();

            const{name, email , phone , message} = userData;
            const res =fetch('hhttps://backend-node-app.herokuapp.com/contactUS',{
                // mode:"no-cors",
                 method:"POST",
                 headers:{"Content-Type" : "application/json"},
                 body:JSON.stringify({name , email , phone , message})
                 
             });
             
             const data = res
             if (!data){
                 console.log("message not Sent")
             }
             else{
                swal({
                    title: "Success",
                    text: "Message Send Succesfully",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  setUserData({...userData , message:""})
             }
             console.log(data)
        }
    return(
        <>
        <div className="contect-info ">
        <h3> Contact Us</h3>
            <div className="container-fluid ">
                <div className="row mt-3">
                    <div className="col-lg-10 offset-lg-1  d-flex justify-content-between border-black  ">
                        <div className="contact_info_item d-flex justify-content-between align_items-center border border-dark bg-light text-dark rounded shadow">
                            <img src="https://img.icons8.com/office/000000/iphone.png" alt="phone"/>
                                <div className="contact_info_content ">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text mr-5">
                                        +918238823284
                                    </div>    
                                </div>
                        </div>

                        <div className="contact_info_item d-flex justify-content-start align_items-center border border-dark bg-light text-dark rounded shadow">
                        <img src="https://img.icons8.com/ios-filled/50/000000/apple-mail.png" alt="mail"/>
                                <div className="contact_info_content ">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text mr-5">
                                        zaidbaba96@gmail.com
                                    </div>    
                                </div>
                        </div>

                        <div className="contact_info_item d-flex justify-content-start align_items-center border border-dark bg-light text-dark rounded shadow">
                        <img src="https://img.icons8.com/dusk/64/000000/order-delivered.png" alt="address"/>
                                <div className="contact_info_content ">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text mr-5">
                                        Ahmedabad,Gujarat
                                    </div>    
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* contect us form */}
        <div className="colntact_form mt-4 bg-light text-dark border border-dark rounded shadow">
            <div className="container border border-black rounded">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="contact_form_container py-5">
                            <div className="contact_form_title font-weight-bold mb-3">
                                Get In Touch
                            </div>
                            <form id="contact_forn " method="POST">
                                <div className="contact_form_name d-flex justify-content-between align-items-between">
                                    <input type="text" id="contact_form_name" className="contact_form_name input_field font-weight-bold" name="name"  value={userData.name} onChange={handleInput}  placeholder="Your Name" required="true"/>
                                    <input type="email" id="contact_form_email" className="contact_form_email input_field font-weight-bold" name="email" value={userData.email} onChange={handleInput} placeholder="Your Email" required="true"/>
                                    <input type="number" id="contact_form_number" className="contact_form_number input_field font-weight-bold" name="phone" value={userData.phone} onChange={handleInput} placeholder="Your Mobile" required="true"/>

                                </div>
                                <div className="contact_form_text  mt-3">
                                    <textarea className="col-lg-10 text_field contact_form_message" rows="10" name="message" value={userData.message} onChange={handleInput} placeholder="Your Message"></textarea>
                                </div>

                                <div className="contact_form_text  mt-2">
                                    <button type="submit" className="button contact_submit_button bg-info text-white " onClick={contractForm}>Send Message</button>  
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}


export default Contact