import React from 'react'
import { useState, useEffect } from 'react'
import { firestore } from './firebase';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid'
import db from './firebase'
import './userlist.css'
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import Navbar from './Navbar';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const UserList = () => {

  const [allUsers, setAllUsers] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [adhar, setAdhar] = useState('')
  const [showEditDetails, setshowEditDetails] = useState(false)
  const [showEditDetailsUserId, setShowEditDetailsUserId] = useState(null)
  const [excelData, setExcelData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageUsers, setCurrentPageUsers] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, []) 

  useEffect(() => {
    setCurrentPageUsers(allUsers.slice((currentPage-1)*5, currentPage*5));
  }, [currentPage])
  

  const fetchUserList = () => {
    const ref = firestore.collection('users');
    ref.get().then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllUsers(items);
      setCurrentPageUsers(items.slice(0, 5));
    });
  }

  const handleUpdateData = (e, id) => {
    e.preventDefault();
    const docRef = db.collection('users').doc(id);
    docRef.update({
      name: name,
      address: address,
      phone : phone,
      adhar: adhar
    })
    .then(() => {
      fetchUserList();
    })
    console.log(id)
    setAddress('');
    setAdhar('');
    setName('');
    setPhone('');
    setShowEditDetailsUserId(null);
  }

  const deleteUser = (id) => {
    const docRef = db.collection('users').doc(id);
    console.log(docRef)
    docRef
      .delete()
      .then(() => {
        fetchUserList();
      })
  }

  const addDataToDatabase = (d) => {
    d.map((entry) => {
      const len = Object.keys(entry).length;
      if(len === 4){
        if(entry.name && entry.address && entry.adhar && entry.phone){
          const id=uuidv4();
          const doc = {
            id: id,
            name: entry.name,
            address: entry.address,
            adhar: entry.adhar,
            phone: entry.phone,
          }
          const collectionRef = db
            .collection('users')
            .doc(`${id}`)
            .set(doc)
            .then(() => {
              fetchUserList();
              console.log(`successfully added user ${entry.name}` )
            })
        } else {
          alert("Invalid Parameters");
        }
      } else {
        alert("Invalid Parameters");
      }
    })
  }

  const handleUploadImage = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      addDataToDatabase(d);
    });


    // will return all rows and columns in result
    // ExcelRenderer(file, (err, res) => {
    //   if(err){
    //     console.log(err);            
    //   }
    //   else{
    //     console.log(res)
    //   }
    // });  
  }

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  }
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'adhar', headerName: 'Adhar', sortable: false, width: 160 },
    // { field: 'delete', headerName: 'Delete Button', sortable: false, width: 160 },
    // { field: 'edit', headerName: 'Edit Button', sortable: false, width: 160 },
  ];

  return (
  <StyledMainDiv>
    <Navbar />
    <div>
      <h1 style={{marginLeft: "3%"}}>All Users</h1>
      <table>
        <tr>
          <th className='ID'>Id</th>
          <th className='Name'>Name</th>
          <th className='Phone'>Phone</th>
          <th className='Address'>Address</th>
          <th className='Adhar'>Adhar</th>
          <th className='Delete'>Delete Button</th>
          <th className='Edit'>Edit Button</th>
        </tr>
        { allUsers.length>0 &&
          currentPageUsers.map((user, key) => (
            <tr>
              <td className='ID'>{user.id}</td>
              <td className='Name'>{user.name}</td>
              <td className='Phone'>{user.phone}</td>
              <td className='Address'>{user.address}</td>
              <td className='Adhar'>{user.adhar}</td>
              <td className='Delete'>
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
                {
                  (showEditDetailsUserId!=user.id ) ? (
                    <td className='Edit'>
                      <button onClick={() => setShowEditDetailsUserId(user.id)}>
                        Edit Details
                      </button>
                    </td>
                  ) : (
                    <td className='Edit' style={{padding: "0px"}}>
                      <form
                      style={{display: "flex"}}
                        onSubmit={(e) =>handleUpdateData(e, user.id)} 
                      >
                        <StyledInput 
                          type="name" 
                          value={name} 
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)} 
                        />
                        <StyledInput 
                          type="address" 
                          value={address} 
                          placeholder="address"
                          onChange={(e) => setAddress(e.target.value)} 
                        />
                        <StyledInput 
                          type="phone" 
                          value={phone} 
                          placeholder="phone"
                          onChange={(e) => setPhone(e.target.value)} 
                        />
                        <StyledInput 
                          type="adhar" 
                          value={adhar} 
                          placeholder="adhar"
                          onChange={(e) => setAdhar(e.target.value)} 
                        />
                        <StyledButton 
                          type="submit" 
                          style={{
                            height: "25px", 
                            margin: "10px", 
                            borderRadius: "8px",
                            width: "5vw",
                            textAlign: "center",
                            fontSize: "16px",
                          }} 
                        >
                          Update
                        </StyledButton>
                      </form>
                    </td>
                  )
                }
            </tr>
          ))
        }
      </table>

      <Pagination 
        count={ Math.ceil(allUsers.length/5) } 
        page={currentPage}
        color="primary" 
        onChange={handlePageChange}
        style={{
          marginTop: "30px",
          justifyContent: "center",
          width: "100%"
        }}
      />

      {/* <div 
        style={{ 
          height: 375, 
          width: '50%',
          marginLeft: '3%'
        }}
      >
        <DataGrid
          rows={allUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div> */}
    </div>
    <div style={{marginLeft: "3%"}}>
      <h1>
        Add Excel File
      </h1>
      <form onSubmit={handleUploadImage}>
        <input 
          type='file'
          style={{
            fontSize: "20px"
          }} 
        />
        <StyledButton 
          type='submit'
          style={{
            fontSize: "20px"
          }} 
        >
          Upload
        </StyledButton>
      </form>
    </div>
  </StyledMainDiv>
  )
}

const StyledInput = styled.input`
  height: 15px;
  margin: 10px;
  border-radius: 8px;
  width: 5vw;
  text-align: center;
  font-size: 18px;
  height: "40px", 
`

const StyledButton = styled.button`
  height: 40px;
  width: 8vw;
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
const StyledMainDiv = styled.div`
`


export default UserList