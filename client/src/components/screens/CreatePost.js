import React, { useEffect, useState } from "react";
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

function CreatePost() {
const [ title, setTitle ] = useState("")
const [ body, setBody ] = useState("")
const [ image, setImage ] = useState("")
const [ url, setUrl ] = useState("")
const history = useHistory()

useEffect(()=>{
  if(url){
    fetch("/createpost", {
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
          title,
          body,
          pic:url
      })
  }).then(res=>res.json())
  .then(data=>{
      if(data.error){
          M.toast({html: data.error, classes:"#c62828 red darkness-3"})
      }else{
          M.toast({html: 'Created Post', classes:"#388e3c green darken-1"})
          history.push('/')
  
      }
  }).catch(err => {
      console.log(err)
  })
  }


}, [url])

const postDetails = () => {
  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","insta-clone")
  data.append("cloud_name", "Marvel Media")
  fetch("https://api.cloudinary.com/v1_1/marvel-media/image/upload", {
    method:"post",
    body:data,
  }).then(res=>res.json())
  .then(data=>{
    // console.log(data)
    setUrl(data.url)
  })
  .catch(err=>{
    console.log(err)
  })


}

  return (
    <div className="card input-filed"
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign: "center"
    }}
    >
      <input type="text" placeholder="title"
      onChange={(e)=>setTitle(e.target.value)}
      value={title}
      />
      <input type="text" placeholder="body"
        onChange={(e)=>setBody(e.target.value)}
        value={body}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action"
      onClick={()=>postDetails()}
      >
            Submit post
        </button>
    </div>
  );
}

export default CreatePost;