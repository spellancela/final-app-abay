/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React,{useState, useRef,useEffect} from "react";
import validateUser from "../hooks/validate-user";
import eventBus from "../eventBus.js";
import Swal from 'sweetalert2'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get,remove,update } from "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyANaqExyrg2RRodGLlPvfcIKRpJqOKj5GI",
   authDomain: "react-app-c2906.firebaseapp.com",
   databaseURL: "https://react-app-c2906-default-rtdb.firebaseio.com",
   projectId: "react-app-c2906",
   storageBucket: "react-app-c2906.appspot.com",
   messagingSenderId: "139039520899",
   appId: "1:139039520899:web:2390dff3cf1dfaa2ea43b6",
   measurementId: "G-0D0FQ0X9WD"
 };
 // Initialize Firebase
const app = initializeApp(firebaseConfig);

const UserForm  = (props) =>{

    let firstnameRef = useRef();
    let lastnameRef = useRef();
    let emailRef = useRef();
    let idRef = useRef();
    let bdayRef = useRef();
    let status = 'Submit your account'


    const [errors,  setError]= useState([]);
    const [isUpdate,setUpdate] = useState(false);
    const [id,setID] = useState();
    let formIsValid = false;
  
    //update= name of the event from the userlist
    useEffect(() => {
        eventBus.on("update", (data) =>
            setUser(data)
       )
    }, []);

    const setUser = (data) => {
        firstnameRef.current.value = data.todo.fname
        lastnameRef.current.value = data.todo.lname
        emailRef.current.value = data.todo.email
        idRef.current.value = data.todo.id
        bdayRef.current.value = data.todo.bday
        setUpdate(true)
        setID(data.id)
    }

    const onSubmitHandler = e =>{
      
        e.preventDefault();

        const  values = { 
            fname: firstnameRef.current.value, 
            lname: lastnameRef.current.value, 
            email: emailRef.current.value, 
            id: idRef.current.value, 
            bday: bdayRef.current.value
        };
        status = 'Confirming . . . .'
        setError(validateUser(values));
        let test =validateUser(values);
        
        if(!test.error){
           if(isUpdate){
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const dbRef = ref(getDatabase());
                    update(child(dbRef, `posts/${id}`),values).then(response => {
                        eventBus.dispatch("added",true);
                    });

                  Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })    
           } else
           
           {

                axios.post(`https://react-app-c2906-default-rtdb.firebaseio.com/posts.json`, values).then(response => {
                    console.log(response)
                    eventBus.dispatch("added",true);
                    Swal.fire(
                        'Good job!',
                        'You successfully added new user!',
                        'success')  // icon only
                })
           }

           status = 'Submit your account'
        }

        // declare test under validate user.
      
        setUpdate(false)
        // setSubmitting(true);
        firstnameRef.current.value = '';
        lastnameRef.current.value = '';
        emailRef.current.value = '';
        idRef.current.value = '';
        bdayRef.current.value = '';
       //http request here
   
    } 

    return ( 
        <div>
         <form className="ui form" onSubmit={onSubmitHandler}>
           
           <div className="two fields">
               <div className='field'> 
                    <label htmlFor='fname'>Enter your First name</label>
                    <input type='text' placeholder="Enter your firstname"
                     id='fname' name='fname'   ref={firstnameRef}/>
                    
                    { errors.fname && <p className="error-text"> {errors.fname}</p>}
                </div>

                <div className='field'> 
                    <label htmlFor='lname'>Enter your Last name</label>
                    <input type='text' placeholder="Enter your lastname"
                    id='lname'  name='lname' ref={lastnameRef}/>
                    
                  { errors.lname && <p className="error-text"> {errors.lname}</p>}
                </div>
            </div>

            <div className="three fields">
               <div className='field'> 
                    <label htmlFor='fname'>Enter your enterprise id</label>
                    <input type='text' placeholder="Enter your id" 
                    id='id' name='id'  ref={idRef}
                    />
                   { errors.id && <p className="error-text"> {errors.id}</p>}
                </div>

                <div className='field'> 
                    <label htmlFor='lname'>Enter your email</label>
                    <input type='text' placeholder="Enter your email"
                    id='email' name='email'    ref={emailRef}/>
                    
                     { errors.email && <p className="error-text"> {errors.email}</p>}
                </div>

                
                <div className='field'> 
                    <label htmlFor='lname'>Enter your birthdate</label>
                    <input type='date' placeholder="MM/DD/YY" 
                    id='bday' name='bday' ref={bdayRef}/>
                    
                   { errors.bday && <p className="error-text"> {errors.bday}</p>}
                </div>
            </div>

           
            <div className='field float-right'>
             <button  disabled={formIsValid} className='ui animated primary button visible content' tabIndex="105" type='submit'>
                <div className="visible content" type="submit" >{status}</div>
                <div className="hidden content">
                    Confirming ..
                </div>
              </button>
            </div>
        </form>
        </div>
    );
}

export default UserForm;