import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function EditDocs({firestore}) {
    const isMounted = useRef()
    const [docsDesc, setDocsDesc] = useState('')
    const collectionRef = collection(firestore, 'docsData')
    const [documentTitle,setDocumentTitle] = useState('')
    const params = useParams()
    //  console.log(params);

    const getQuillData = (value)=>{
           setDocsDesc(value)
           
    }
    
   
    useEffect(()=>{
        const updateDocsData = setTimeout(()=>{
            const document = doc(collectionRef, params.id)
            updateDoc(document,{
                 docsDesc : docsDesc
            })
            .then(()=>{
                toast.success('Document Saved',{
                    autoClose: 2000
                })
            })
            .catch(()=>{
                toast.error('Cannot Save Document',{
                    autoClose: 2000
                })
            })
    
        },1000)
        return ()=>clearTimeout(updateDocsData)
    },[docsDesc])

    const getData = ()=>{
      const document = doc(collectionRef,params.id)
      onSnapshot(document,(docs)=>{
        setDocumentTitle(docs.data().title)
        setDocsDesc(docs.data().docsDesc)
        // console.log(docs.data().docsDesc);
      })
    }
   useEffect(()=>{
    if(isMounted.current){
        return
    }
    isMounted.current = true
    getData()
   },[])

   
  return (
    <div style={{padding:'20px',flexDirection:'column',alignItems:'center',justifyContent:'center',display:'flex'}}>
        <h1>{documentTitle}</h1>
        <div style={{width:'800px',padding:'20px'}}><ReactQuill value={docsDesc} onChange={getQuillData}/></div>
        <ToastContainer />
        </div>
  )
}

export default EditDocs