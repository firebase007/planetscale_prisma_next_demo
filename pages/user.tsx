import styles from '../styles/Home.module.css'
import UserForm from '../component/user';
import { prisma } from '../lib/prisma';
import { GetStaticProps } from 'next'
import { User } from '.prisma/client';
import React, { useState,useEffect } from 'react';
import { MdEdit,MdOutlineDeleteOutline } from "react-icons/md";

export const getStaticProps: GetStaticProps = async (ctx) => {
    
    const users:User[] = await prisma.user.findMany()
  
    return {
        props: {
            users:users
        }
    }
}

type PropType = {
    users:User[]
}

type validateId ={
    id?:string|number
}
type userType = validateId & Omit<User, "id">

const User = (props:PropType) => {
    const {users} = props
    
    const [userList, setUserList] = useState<User[]>([])

    const [userDetails,setUserDetails] = useState<userType>({
        id:'',
        name:'',
        profession:''
        })

    useEffect(()=>{
        setUserList(users)
    },[users])

    const onDelete=async(id:number)=>{
        const deleteId = JSON.stringify({id})
        await fetch('/api/delete',{
            method:"DELETE",
            body:deleteId
        })

    let userListDemo = [...userList]
    let usr= userListDemo.filter((u=>u.id !== id))
      setUserList(usr)
    }

    const onUpdate=(id:number)=>{
       let usr = userList.filter((u=>u.id === id))
       if(usr.length > 0){
        setUserDetails({
            id:id,
            name:usr[0].name,
            profession:usr[0].profession
        })
       } 
    }
    
    return (
       <section className={styles.user}>
          <div className={styles.formDiv}>
              <UserForm 
                  setUserList={setUserList}
                  userList={userList}
                  setUserDetails={setUserDetails} 
                  userDetails={userDetails} />
          </div>
          <div className={styles.userList}>
              <table >
                  <thead>
                      <tr>
                         <th>Id</th>
                         <th>Name</th>
                         <th>Profession</th>
                         <th>Edit</th>
                         <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      {userList.map((u,i)=>(
                          <tr key={i}>
                              <td>{u.id}</td>
                              <td>{u.name}</td>
                              <td>{u.profession}</td>
                              <td><MdEdit onClick={id=>onUpdate(u.id)} /></td>
                              <td><MdOutlineDeleteOutline onClick={id=>onDelete(u.id)} /></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
       </section>
    )
}

export default User;