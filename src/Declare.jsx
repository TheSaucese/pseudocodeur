import React from 'react'
import Input from './Input'

const Declare = (props) => {
  const {variables} = props;
  console.log(variables)
  return (
    <div className='bg-[#CCCCCC] z-10 shadow focus:shadow-outline w-[7rem] min-w-min inline-flex p-3 rounded-lg items-center'>
      <input className='mx-2 text-sm rounded-lg focus:shadow-outline focus:outline-none  h-[1.5rem] w-[3rem] text-center text-[#1e50b3]' placeholder='type'/> 
      <Input variables={variables}/>
    </div>
  )
}

export default Declare