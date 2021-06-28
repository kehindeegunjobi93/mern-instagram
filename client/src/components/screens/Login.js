import React, {useState,useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

function Login() {
    const {dispatch}= useContext(UserContext)
  const history = useHistory()
  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")

  const PostData = () => {
    fetch("/signin", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password,
            email
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error, classes:"#c62828 red darkness-3"})
        }else{
            M.toast({html: "signed in successfully", classes:"#388e3c green darken-1"})
            localStorage.setItem('jwt', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            dispatch({type: "USER", payload:data.user})
            history.push('/')

        }
    }).catch(err => {
        console.log(err)
    })
}

    return (
    <div className="mycard">
      <div className="card auth-card input-field">
       <h2 className="brand-logo">Instagram</h2>
       <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
       />
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
       />
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={()=>PostData()}
        type="submit" name="action">
            Login
        </button>
        <h5>
            <Link to="/signup">Dont have an account? </Link>
        </h5>
      </div>
    </div>
    )
}

export default Login
