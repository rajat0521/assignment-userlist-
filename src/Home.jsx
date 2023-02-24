import React from 'react'
import { useState, useEffect } from 'react'
import db from './firebase'
import { collection } from "firebase/firestore";
import { doc, getDocs } from 'firebase/firestore'
import { firestore } from './firebase';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import { storage } from './firebase';
import { ref, uploadBytesResumable , getDownloadURL } from "firebase/storage"


const Home = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [companyDetails, setCompanyDetails] = useState({ })
  const [image, setImage] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    FetchCompanyDetails();
    FetchImageDetails();
  }, [])  

  const handleChangeDetails = (e) => {
    e.preventDefault();
    const docRef = db.collection('companyData').doc("6666");
    const doc = {
      name : name,
      address : address,
    }
    if(name === ''){doc.name=companyDetails.name;}
    if(address === ''){doc.address=companyDetails.address;}
    docRef.update(doc)
    .then(() => {
      setName('');
      setAddress('');
      console.log('Document updated successfully!');
      FetchCompanyDetails();
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  const FetchCompanyDetails = () => {
    const ref = firestore.collection('companyData');
    ref.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCompanyDetails(items[0]);
    });
  }

  const FetchImageDetails = () => {
    const ref = firestore.collection('image');
    ref.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setImage(items[0].src);
    });
  }

  const handleUpadteImageUrlInfirestore = (downloadURL) => {
    const docRef = db.collection('image').doc("image");
    docRef.update({
      src: downloadURL
    })
    .then(() => {
      alert("updated successfully");
      // FetchImageDetails();
    })
    .catch((error) => {
      console.error('Error updating image url: ', error);
    });

  }

  const handleUploadImage = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `image/`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL)
          handleUpadteImageUrlInfirestore(downloadURL);
        });
      }
    );
  }

  return (
    <>
      <Navbar />
      <div>
        <div>
          <img 
            src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'
            alt='logo'
            style={{
              width: "100vw",
              overflow: "hidden",
              height: "650px",  
            }}
          />
          <img 
            src={image}
            alt='logo'
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              marginTop: "-104px",
              marginLeft: "43vw",
            }}
          />
        </div>
        <form onSubmit={handleUploadImage}>
          <input 
            type='file'
            style={{
              fontSize: "20px"
            }} 
          />
          <StyledButton 
            type='submit'
            style={tempStyle}
          >
            Upload
          </StyledButton>
        </form>

        <h2> Company Name - {companyDetails.name} </h2>
        <h2> Company Address - {companyDetails.address} </h2>
        <form onSubmit={handleChangeDetails}>
          <input 
            type="name" 
            value={name}
            style={tempStyle} 
            placeholder="Change Name"
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="address" 
            value={address} 
            style={tempStyle}
            placeholder="Change Address"
            onChange={(e) => setAddress(e.target.value)} 
          />
          <StyledButton 
            type="submit" 
            style={tempStyle}
          >
            Change
          </StyledButton>
        </form>
      </div>
    </>
    
  )
}
const tempStyle = {
  height: "40px", 
  margin: "10px", 
  borderRadius: "8px",
  width: "15vw",
  textAlign: "center",
  fontSize: "20px"
}

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

export default Home