const DocCard = ({ docUrl, docName }) => {
  return (
    <div className='border rounded-lg shadow-lg p-4 bg-[#e8e8e8]'>
      <iframe
        src={docUrl}
        className='w-full h-32 mb-4'
        title='Document Preview'
      ></iframe>
      <div className='flex justify-between items-center'>
        <span className='text-lg font-semibold'>{docName}</span>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Info
        </button>
      </div>
    </div>
  )
}

export default DocCard
