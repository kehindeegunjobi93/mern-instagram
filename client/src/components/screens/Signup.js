import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory()
   const [ name, setName ] = useState("")
   const [ password, setPassword ] = useState("")
   const [ email, setEmail ] = useState("")
   const [ image, setImage ] = useState("")
   const [url, setUrl ] = useState("")

   const PostData = () => {
       fetch("/signup", {
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               name,
               password,
               email
           })
       }).then(res=>res.json())
       .then(data=>{
           if(data.error){
               M.toast({html: data.error, classes:"#c62828 red darkness-3"})
           }else{
               M.toast({html: data.message, classes:"#388e3c green darken-1"})
               history.push('/signin')

           }
       }).catch(err => {
           console.log(err)
       })
   }


    return (
        <div>
           <div className="mycard">
      <div className="card auth-card input-field">
      <h2 className="brand-logo">Instagram</h2>
       <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
       />
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
            Signup
        </button>
        <h5>
            <Link to="/signin">Already have an account? </Link>
        </h5>
      </div>
    </div>  
        </div>
    )
}

export default Signup
