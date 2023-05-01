import React from 'react'
import Input from './Input'

const Read = (props) => {
  const {variables,id} = props;
  return (
    <div className='bg-[#CCCCCC] shadow focus:shadow-outline w-[5rem] inline-flex p-3 rounded-lg items-center'>
      <p className='mr-2'>lire</p>
      <Input variables={variables} pparentID={id} isFirstChild={null}/>
    </div>
  )
}

export default Read