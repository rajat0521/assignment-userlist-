import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {

  const [link, setLink] = useState('/home')
  const navigate = useNavigate();
  
  return (
    <div
      style={{
        backgroundColor: "#1c1c5d",
        height: "50px",
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "20px",
        paddingRight: "30px",
          
      }}
    >
      <div>
        <NavLink onClick={() => navigate('/home')}>
          <span>
            Home
          </span>
        </NavLink >
        <NavLink onClick={() => navigate('/createUser')}>
          <span>
            Create User
          </span>
        </NavLink>
        <NavLink onClick={() => navigate('/userlist')}> 
          <span>
            User List
          </span>
        </NavLink>
        <NavLink onClick={() => navigate('/logout')}>
          <span>
            Logout
          </span>
        </NavLink>
      </div>
    </div>
  )
}


export const NavLink = styled.button`
  font-size: 21px;
  cursor: pointer;
  font-weight: 200;
  color: white;
  text-decoration: none;
  margin-left: 15px;
  border: none;
  background: transparent;
  
  span{
    letter-spacing: 1.42px;
    font-size: 20px;
    font-weight: lighter;
    line-height:  1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;
    
    &:before{
      background-color: rgb(249,249,249);
      bottom: -6px;
      content: '';
      height: 2px;
      left: 0px;
      opacity: 0;
      position: absolute;
      right: 0px;
      transform-origin: left center;
      transform:  scaleX(0);
      visibility: hidden; 
      transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s ;
      width: auto;
    }
  }

  &:hover{
    span:before{
    transform: scaleX(1);
    visibility: visible;
    opacity: 1 !important;

    }
  }
`

export default Navbar