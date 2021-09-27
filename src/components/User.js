/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { Component } from "react";
import Layout from "../UI/Layout";
import MainHeader from "../UI/MainHeader";
import UserForm from "./UserForm";
import UserList from "./UserList";

import classes from './User.module.css';

const User =()=>{

const [enterUserList, setUserList ]  =  useState([]);

const onAdd =(user)=>{
    console.log(user)
    setUserList((prevUsers)=>{
        return [...prevUsers, 
            {fname: user.fname, lname: user.lname, email: user.email, id:user.id, bday: user.bday}]
     })
}




 return (

    <div>
      
       <header className={classes.title}> Add New User </header>
        <div>     <UserForm addUser={onAdd} />  </div>
    
       
    </div>


 )
}

export default User;