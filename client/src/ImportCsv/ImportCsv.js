import React, {useCallback, useState, useContext} from 'react';
import {store} from '../Table/contact'
import {useDropzone} from 'react-dropzone'
import axios from "axios"
import './style.css'



function ImportCsv() {
 const[arr , setArr]= useState()
const[popup, setpopup] = useContext(store)

const ProcessCsv= async (str)=>{
    const headers = str.slice(0,str.indexOf('\n')).trim().split(',')
    const rows =str.slice(str.indexOf('\n')+1).trim().split('\n')
   const newArr = rows.map((row)=>{
    
      const Value = row.split(',')
      const eachObj = headers.reduce((obj,header,i)=>{
        obj[header]= Value[i];
        return obj;
      },{})
      return eachObj;
    })
    onChange(newArr)
  }
  const onChange=(e)=>{ 
    const authToken = localStorage.getItem('user')
    axios({
      url:"https://contactmanager-server.herokuapp.com/user/add",
      method:"POST",
      headers:{
        authorization:authToken
      },
      data:e
    }).then(()=>setpopup(2))
    .catch((err)=>{console.log(err.message)})
    console.log(e, "Hello")}
  

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      ProcessCsv(binaryStr)
      }
      reader.readAsText(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (popup === 1)?(
    <div className='csv-file'>
    <div {...getRootProps()} className="fileSelect">
    <p className='upload_file'><i className="material-icons">upload_file</i></p>
      <h3>Import File</h3>
      <input {...getInputProps()}/>
      <p className='drop'>Drag & Drop a CSV File to</p>
        <p className='drop'>Upload</p>
    </div>
    <br/>
    <button className='file-cancel' onClick={()=>setpopup(0)}>cancel</button>
    </div>
  ):""
}
export default ImportCsv