import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { firestore } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const style ={
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign:'center',
}

function Mod({open,setOpen,title,setTitle}) {
    const navigate = useNavigate()
    const handleClose =()=>setOpen(false)
    const collectionRef = collection(firestore, 'docsData')
    const [docsData,setDocsData] = useState([])
    const isMounted = useRef()


    
   const addData = () => {
  addDoc(collectionRef, {
    title: title,
    docsDesc:""
  })
  .then(() => {
    toast.success(`${title} added`);
    handleClose()
    setTitle('')
  })
  .catch((error) => {
    // console.error("Error adding document: ", error);
    toast.error('Cannot add data');
  });
};

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
        setDocsData(data.docs.map((doc)=>{
            return {...doc.data(), id: doc.id}
        
     
        
      }))
      })
    }
    useEffect(()=>{
        if (isMounted.current){
            return
        }
        isMounted.current = true
        getData()
    },[])


 

  const getId =(id)=>{
console.log(id);
navigate(`/editDocs/${id}`)
  }
const deleteId = (id,title)=>{
    const docRef = doc(firestore,'docsData',id)
    deleteDoc(docRef)
    .then(()=>{
        toast.success(`${title} deleted`)
    })
    .catch((err)=>{
        console.log(`${err}`);
    })
}

  return (
    <>
   
  
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <TextField onChange={(e)=>setTitle(e.target.value)} value={title} id="outlined-basic" label="Add The Title" variant="outlined" fullWidth />
  <Button onClick={addData} className='mt-3' variant="contained" color="warning">
  Add
</Button>
 
  </Box>
</Modal>
{/* Rendering the data */}
<div className='mt-4' style={{ display: 'flex', flexWrap: 'wrap' }}>
  {
    docsData.map((doc) => (
      <div key={doc.id} style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: 'rgb(98, 98, 98)', marginRight: '10px', marginBottom: '10px' }}>
        <div className='d-flex justify-content-left'>
          <i className='fa-solid fa-pen-to-square' onClick={() => getId(doc.id)} style={{ marginRight: '10px' }}></i>
          <i style={{ color: 'red' }} className='fa-solid fa-trash' onClick={(e) => { e.stopPropagation(); deleteId(doc.id, doc.title); }}></i>
        </div>
        <h3 style={{ margin: 0 }}>{doc.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }}></div>
      </div>
    ))
  }
</div>
<ToastContainer />
    </>
  )
}

export default Mod