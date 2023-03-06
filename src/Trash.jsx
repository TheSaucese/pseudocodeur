import React from 'react'

const Trash = ({overid}) => {
  return (
    <>
    <div className={!overid?"border-dashed border-t-2 border-r-2 border-b-2 h-full":"border-dashed border-red-500 border-t-2 border-r-2 border-b-2 h-full"}/>
    <div className={!overid?'fas fa-trash-alt fa-10x absolute left-12 bottom-[28rem] text-white':'fas fa-trash-alt fa-10x absolute left-12 bottom-[28rem] text-red-500'}></div>
    </>
  )
}

export default Trash