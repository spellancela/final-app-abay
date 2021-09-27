
export default function validateUser(values){

    let errors = {};
     errors.error =false;
    //ar pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-1])\/([0-9]{4})$/

    if(!values.fname.trim()  ){
        errors.fname= "Complete name is required";
        errors.error = true
    }
    else if (!/^[a-zA-Z ]+$/.test(values.fname)){
        errors.fname= "Numeric number is invalid";
        errors.error = true
    }

    if(!values.lname.trim()){
        errors.lname= "Complete name is required";
        errors.error = true
    } else if (!/^[a-zA-Z ]+$/.test(values.lname)){
        errors.lname= "Numeric number is invalid";
        errors.error = true
    }

    if(!values.email){
        errors.email="Email is required"
        errors.error = true
    } else if(!/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i.test(values.email)) {
        errors.email="Email is invalid"
        errors.error = true
    }

    if(!values.id){
        errors.id="Id is required"
    } else if(/^[a-zA-Z ]+$/.test(values.id))
    {
        errors.id ="Numeric number only"
    }

    if(!values.bday){
        errors.bday="Birthday is required" 
        errors.error = true}

    // } else if(!pattern.test(values.bday)){
    //     errors.bday="Invalid date of birth"
    // }

    return errors;

}   

