import React from 'react'
import styled from "styled-components";
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom";
import db from './firebase'
import Navbar from './Navbar';

const CreateUser = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [adhar, setAdhar] = useState('')

  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    const id=uuidv4();
    const doc = {
      id: id,
      name: name,
      address: address,
      adhar: adhar,
      phone: phone,
    }
    const collectionRef = db
      .collection('users')
      .doc(`${id}`)
      .set(doc)
      .then(() => {
        navigate('/userlist');
      })
    setAddress('');
    setAdhar('');
    setName('');
    setPhone('');
  }

  return (
    <>
      <Navbar />
      <h1 style={{display: "flex", justifyContent: "center"}}>
        Create a new User
      </h1>
      <form
        style={{
          display:"flex", 
          flexDirection:"column", 
          alignItems:"center"
        }}
        onSubmit={handleCreateUser} 
      >
        <StyledInput 
          type="name" 
          value={name} 
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)} 
        />
        <StyledInput 
          type="address" 
          value={address} 
          placeholder="address"
          required
          onChange={(e) => setAddress(e.target.value)} 
        />
        <StyledInput 
          type="phone" 
          value={phone} 
          placeholder="phone"
          required
          onChange={(e) => setPhone(e.target.value)} 
        />
        <StyledInput 
          type="adhar" 
          value={adhar} 
          placeholder="adhar"
          required
          onChange={(e) => setAdhar(e.target.value)} 
        />
        <StyledButton >
          Create User
        </StyledButton>
      </form>
    </>
    
  )
}

const StyledInput = styled.input`
  height: 40px;
  margin: 10px;
  border-radius: 8px;
  width: 25vw;
  text-align: center;
  font-size: 25px;
  height: "40px", 
`
const StyledButton = styled.button`
  height: 45px;
  width: 20vw;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 25px;
  color: white;
  cursor: pointer;
  background-color: #2f2f95;

  &:hover{
    background-color: #3333c9;
  }
`


export default CreateUser