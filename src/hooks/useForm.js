
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import validateUser from "./validate-user";
import addUser from "./add-user";

const useForm = (props, validateUser)=> {
   
    const[values, setValues] = useState({
        fname: '',
        lname: '',
        id: '',
        email:'',
        bday:''
    });

  

    const [errors,  setError]= useState({});
    const [isSubmit, setSubmitting] = useState(false);


    const handleChange = e => {
  
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        }); 

     props.addUser(value);
    };

    const onSubmitHandler = e =>{

        const {name, value} = e.targe
        e.preventDefault();

        setError(validateUser(values));
        setSubmitting(true);

        console.log(values);
       

    };
 
 //forward data to UserDetails
 props.onAdd(values);  
    return { handleChange, values, onSubmitHandler, errors};
}

export default useForm;