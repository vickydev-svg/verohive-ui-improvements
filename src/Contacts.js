import Axios from 'axios';
import React, { useEffect,useState } from 'react'

export default function Contacts(props) {
  const [contact, setContact] = useState('empty')
  useEffect(() => {
    getMycontacts=()=>{
      let name=props.location.state.firstname +" " +this.props.location.state.lastName;
      let privateKey=this.props.location.state.privatekey
      Axios.post('https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/',{
             veroKey:privateKey,
             name:name
           }).then((res)=>{
             console.log(res.data,"contacts sky")
             setContact(res.data.contact)
           }).catch((err)=>{console.log(err)})
    }
    
  }, [])
  return (
    <div>
      {contact}
    </div>
  )
}
