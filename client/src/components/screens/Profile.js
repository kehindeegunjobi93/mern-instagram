import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../App'

function Profile() {
  const [mypics, setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
      fetch('/mypost', {
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>{
        setPics(result.mypost)
      })
    },[])

    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
          <div
          style={{
            margin:"18px 0px",
            borderBottom: "1px solid grey"
        }}>

            <div style={{
                display:"flex",
                justifyContent:"space-around",
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px"}}
                    alt="" 
                    src="https://images.unsplash.com/photo-1596935884413-260a972dab44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                    />
                </div>
           
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            style={{    margin: "10px 0px 10px 55px" }}
                type="submit" name="action">
            Update Pic
                </button>
                </div>

        
            <div className="gallery">
              {
                mypics.map(item=>{
                  return(
                    <img key={item._id} className="item"
                    alt={item.title}
                      src={item.photo} 
                    />
                  );
                })
              }
              
             
            </div>
        </div>
    )
}

export default Profile
