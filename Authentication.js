import React,{useState} from 'react';
import './Authentication.css';
import {auth} from './Firebase';
import {useHistory} from "react-router-dom"

function Authentication() {
    const History=useHistory();
    const [email,setemail]=useState();
    const[password,setpassword]=useState();
    console.log(email);
    console.log(password)
   
    const signin=(e)=>{
        
        e.preventDefault()
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(user=>
            {History.push("/")}).catch(error=>alert(error.message))


    }
    const signup=(e)=>{
        
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then(user=>{
            if(auth){
                History.push("/");
            }
        }).catch(error=>alert(error.message))

    }

    return (
        <div className="authentication">
            <form autoComplete="off" >
                <div>
                <label>Email:</label><br/>
                <input type="email"  className="input" onChange={(e)=>setemail(e.target.value)} placeholder="Email"/>
                </div>
                <div>
                <label>Password:</label><br/>
                <input type="password"  className="input"onChange={(e)=>setpassword(e.target.value) } placeholder="Password"/>
                </div>
                <div className="butto">
                    <button onClick={signin}>Signin</button>&nbsp;&nbsp;
                    <button onClick={signup}>Signup</button>
                </div>

            </form>
        </div>
    )
}

export default Authentication
