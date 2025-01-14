const Row = ({ data }) => {
  return (
    <div
      key={data.id}
      className='flex items-center py-4 border-b text-sm hover:bg-gray-50'
    >
      <div className='w-16 text-gray-600'>{data.id}</div>
      <div className='w-36 text-gray-600'>{data.dateTime}</div>
      <div className='w-32 text-gray-600'>{data.rider}</div>
      <div className='w-32 text-gray-600'>{data.driver}</div>
      <div className='w-24 text-gray-600'>${data.fare}</div>
      <div className='w-36'>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            data.vehicleCategory === 'Premium'
              ? 'bg-purple-100 text-purple-600'
              : 'bg-teal-100 text-teal-600'
          }`}
        >
          {data.vehicleCategory}
        </span>
      </div>
      <div className='w-28'>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            data.status === 'Completed'
              ? 'bg-green-100 text-green-600'
              : data.status === 'Ongoing'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-orange-100 text-orange-600'
          }`}
        >
          {data.status}
        </span>
      </div>
      <div className='w-24 text-gray-600'>{data.rideNow}</div>
      <div className='w-36 text-gray-600'>{data.preBooking}</div>
    </div>
  )
}

export default Row
