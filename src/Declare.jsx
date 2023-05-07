import React from 'react'
import Input from './Input'

const Declare = (props) => {
  const {variables,id,subtype} = props;
  return (
    <div className='bg-[#CCCCCC] z-10 shadow focus:shadow-outline w-[7rem] min-w-min inline-flex p-3 rounded-lg items-center'>
      <div className='mx-2 text-sm rounded-lg focus:shadow-outline focus:outline-none  h-[1.5rem] w-[3rem] text-center text-[#1e50b3]' placeholder='type'>{subtype}</div> 
      <Input variables={variables} pparentID={id} isFirstChild={null}/>
    </div>
  )
}

export default Declare