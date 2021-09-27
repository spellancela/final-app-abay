import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get,remove } from "firebase/database";
import eventBus from "../eventBus.js";
import Swal from 'sweetalert2'

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
const UserList = () => {
  const [users, setUser] = useState();
  const [userID,setUserID] = useState();

  useEffect(() => {
      eventBus.on("added", (data) =>
            getUserPosts()
      )
      getUserPosts();
  }, []);


  function getUserPosts(){

    console.log('Getting . . .')
   const dbRef = ref(getDatabase());
  
   //snapshot  == object
   get(child(dbRef, `posts`)).then((snapshot) => {
     
    console.log(snapshot);
     if (snapshot.exists()) {
      setUser(Object.values(snapshot.val()));  // this will set the data 
      setUserID(Object.keys(snapshot.val()));
     } else {
       console.log("No data available");
       setUser([]);
       setUserID([]);

     }
   }).catch((error) => {
     console.error(error);
   });
}


 function update(id){
   let index = userID.findIndex(t => t === id)
 
   console.log('update');

   eventBus.dispatch("update", { user: users[index],id : id });
   
 }

 function deleteUserPost(id){
   const dbRef = ref(getDatabase());

   let arr = users;
   let index = userID.findIndex(t => t === id)

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
            remove(child(dbRef, `posts/${id}`)).then((snapshot) => {
              getUserPosts();
            })
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

}

  return (
    <div>
      <h1 className="mt-5 text-center"> User List </h1>
      <table className="table table-striped">
                <thead>
                   <tr>
                     <th>ID</th>
                     <th>Firstname</th>
                     <th>Lastname</th>
                     <th>Email</th>
                     <th>Birthdate</th>
                     <th>Action</th>
                  </tr>
                </thead>
                <tbody>
      {users &&
        users.map((user,index) => {
          const { bday,email,fname,id,lname} = user;
          return (
                   <tr key={index}>
                        <td>{id}</td>
                        <td>{fname}</td>
                        <td>{lname}</td>
                        <td>{email}</td>
                        <td>{bday}</td>
                        <td>
                        <button className="btn btn-primary m-2" onClick={e => update(userID[index])}>
                        Update
                        </button>

                        <button className="btn btn-danger" onClick={e => deleteUserPost(userID[index])}>Delete</button>
                        </td>

                   </tr>
          );
        })}
         </tbody>
      </table>
    </div>

    
  );
};

export default UserList;
