export const RegisterInput = ({ label, inputType, ...rest }) => {
  console.log(rest)
  const { isRequired } = rest
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 border-b-2 pb-2 mb-2'>
      <label
        htmlFor='{label}'
        className='grow-0 flex justify-start items-center'
      >
        {label} {isRequired ? '*' : ''}
      </label>
      <div className='p-2 '>
        <input
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-100'
          type={`"${inputType}"`}
          fullWidth
          {...rest}
        />
      </div>
      <div className='flex sm:justify-end md:justify-start items-center'>
        <p className='text-sm font-extrabold'>{isRequired ? 'Required' : ''}</p>
      </div>
    </div>
  )
}

export const RegisterBtn = ({ label }) => (
  <div className='flex justify-center'>
    <button
      type='submit'
      className='border-2 p-2 rounded-lg hover:bg-red-200 hover:border-0 hover:font-extralight hover:text-lg'
    >
      {label}
    </button>
  </div>
)
