
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Docs from './components/Docs'
import EditDocs from './components/EditDocs'
import { app, firestore,  } from './firebaseConfig'

function App() {

  return (
    <>
<Routes>
  <Route path='/' element = {<Docs firestore={firestore}/>}/>
  <Route path='/editDocs/:id' element = {<EditDocs firestore={firestore}/>}/>

</Routes> 
   </>
  )
}

export default App
