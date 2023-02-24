import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Successfully Logged in")
        navigate('/home');
      })
      .catch((error) => {
        alert('Wrong Email or Password')
        console.log(error)
      });
  };

  return (
    <form 
      onSubmit={handleLogin} 
      style={{
        display:"flex", 
        flexDirection:"column", 
        alignItems:"center"
        }}
      >

      <StyledInput 
        type="email" 
        value={email} 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} 
      />

      <StyledInput 
        type="password" 
        value={password} 
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)} 
      />
      
      <button 
        type="submit" 
        style={{
          height: "40px", 
          margin: "10px", 
          borderRadius: "8px",
          width: "25vw",
          textAlign: "center",
          fontSize: "25px"
        }} 
      >
        Login
      </button>
    </form>
  );
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

export default Login;
