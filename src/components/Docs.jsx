import { Button } from '@mui/material'
import React, { useState } from 'react'
import Mod from './Mod'


function Docs( {firestore}) {
    const [open,setOpen] = React.useState(false)
    const handleOpen = ()=>setOpen(true)
    const [title,setTitle] = useState('')
  return (
    <>
      <div  style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center bg-dark flex-column' >
         <div  className='bg-light p-5 rounded text-center '>
         <h2>Docs App</h2>
         <Button variant="contained" onClick={handleOpen}> <i class="fa-solid fa-plus"></i> Add a Document</Button>
         <Mod open={open} setOpen={setOpen} title={title} setTitle={setTitle}/>
         </div>
         
          </div>
    </>
  )
}

export default Docs