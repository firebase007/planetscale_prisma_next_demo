import { User } from '.prisma/client'
import React from 'react'

type validateId ={
    id?:string|number
}

type userType =validateId & Omit<User, "id">

type propType ={
    userList: User[],
    setUserList: React.Dispatch<React.SetStateAction<User[]>>,
    userDetails: userType,
    setUserDetails: React.Dispatch<React.SetStateAction<userType>>,
}

const UserForm = (props:propType) => {
    const {userList,setUserList,userDetails,setUserDetails,} = props
    
    const {id,name,profession} = userDetails
    
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails({
            ...userDetails,[e.target.name]:e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        })
    }

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
          if(id === ''){
          const body = JSON.stringify({name,profession})
          const res = await fetch('/api/create',{
              method:"POST",
              headers:{
                  'content-Type':'application/json'
              },
              body:body
          })
          const data = await res.json()
          if(data.user){
              setUserList(prev=>[...prev, data.user])
          }
        }else{
            const body = JSON.stringify({id,name,profession})
          await fetch('/api/update',{
              method:"PATCH",
              headers:{
                  'content-Type':'application/json'
              },
              body:body
          })
         const userLst = [...userList]
         const index = userList.findIndex(usr=>usr.id === id)
         userLst[index].name=name
         userLst[index].profession = profession
        setUserList(userLst)  
        }    
    }
    
    return (
       <form onSubmit={onSubmit} action="">
           <input type="text" name="name" onChange={onChange} value={name} placeholder='name' />
           <input type="text" name="profession" onChange={onChange} value={profession} placeholder='profession' />
           <input type="submit" value="save" />
       </form>
    )
}

export default UserForm