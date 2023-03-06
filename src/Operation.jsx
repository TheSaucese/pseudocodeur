import React from 'react'
import Input from './Input'
import './Operation.css'

const Operation = () => {
  const handleOperationType = (e) => {
    var id = document.getElementById('main').className.slice(130,200);
    document.getElementById('main').className=document.getElementById('main').className.slice(0,130)+e.currentTarget.id
    e.currentTarget.className=e.currentTarget.className.slice(0,141)+id
    e.currentTarget.id=id;
    document.getElementById('group').style.display='none'
  }
return (
    <div className='bg-[#CCCCCC] z-0 shadow focus:shadow-outline w-[7rem] flex justify-between p-3 rounded-lg items-center'>
      <Input/>
      <input className="rounded-md w-[1.5rem] max-w-fit min-h-[1.5rem] text-center shadow focus:shadow-outline focus:outline-none  appearance-none"/>
      <Input/>
    </div>
  )
}

export default Operation