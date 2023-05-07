import React from 'react'
import Input from './Input'
import './Operation.css'

const RenderSwitch = (props) => {
  switch(props) {
    case '+':
      return 'bar';
    default:
      return 'foo';
  }
}

const Operation = (props) => {
  const {variables,id,subtype} = props;
  console.log(subtype);
  const handleOperationType = (e) => {
    var id = document.getElementById('main').className.slice(130,200);
    document.getElementById('main').className=document.getElementById('main').className.slice(0,130)+e.currentTarget.id
    e.currentTarget.className=e.currentTarget.className.slice(0,141)+id
    e.currentTarget.id=id;
    document.getElementById('group').style.display='none'
  }
return (
    <div className='bg-[#CCCCCC] z-0 shadow focus:shadow-outline min-w-[7rem] flex justify-between p-3 rounded-lg items-center'>
      <Input variables={variables} pparentID={id} isFirstChild={"left"}/>
      <div className="rounded-md w-[1.5rem] max-w-fit min-h-[1.5rem] text-center shadow focus:shadow-outline focus:outline-none  appearance-none"> 
        {subtype}
         </div>
      <Input variables={variables} pparentID={id} isFirstChild={"right"}/>
    </div>
  )
}

export default Operation