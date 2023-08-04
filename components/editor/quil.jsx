import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function QuillEditor ({ quillRef }) {
  //   const [value, setValue] = useState('')
  //   console.log(value)
  //   return <ReactQuill ref={quillRef} theme='snow' value={value} />
  return (
    <div className='my-3 py-2'>
      <ReactQuill ref={quillRef} theme='snow' />
    </div>
  )
}
