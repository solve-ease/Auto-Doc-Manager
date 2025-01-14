import React from 'react'
import Row from './Row'

const Table = ({}) => {
  const data = [
    {
      id: '379',
      dateTime: '2024-Dec-01 09:30',
      rider: 'Sofia Kim',
      driver: 'Jo Johnson',
      fare: '22.50',
      vehicleCategory: 'Standard',
      status: 'Completed',
      rideNow: 'Yes',
      preBooking: '2024-Dec-01 09:00'
    },
    {
      id: '380',
      dateTime: '2024-Dec-01 10:15',
      rider: 'Mark Reilly',
      driver: 'Mike John',
      fare: '18.00',
      vehicleCategory: 'Premium',
      status: 'Ongoing',
      rideNow: 'No',
      preBooking: '---'
    },
    {
      id: '381',
      dateTime: '2024-Dec-01 10:45',
      rider: 'John Quinn',
      driver: 'Jack Miller',
      fare: '35.00',
      vehicleCategory: 'Premium',
      status: 'Reserved',
      rideNow: 'No',
      preBooking: '2024-Dec-01 11:00'
    },
    {
      id: '382',
      dateTime: '2024-Dec-01 11:00',
      rider: 'Robert Berry',
      driver: 'Marty Jane',
      fare: '30.00',
      vehicleCategory: 'Standard',
      status: 'Reserved',
      rideNow: 'No',
      preBooking: '2024-Dec-01 11:30'
    }
  ]
  const ColumnNames = [
    'S.No',
    'Date & Time',
    'Rider',
    'Driver',
    'Fare',
    'Vehicle category',
    'Status',
    'Ride now',
    'Pre-booking'
  ]
  return (
    <div className='w-full bg-white rounded-lg shadow-sm p-4'>
      <div className='flex flex-col'>
        {/* Table Header */}
        <div className='flex items-center py-3 border-b text-sm text-gray-500 font-medium'>
            {ColumnNames.map(()=>{
                
            })}
          <div className='w-16'></div>
          <div className='w-36'></div>
          <div className='w-32'>Rider</div>
          <div className='w-32'></div>
          <div className='w-24'></div>
          <div className='w-36'></div>
          <div className='w-28'></div>
          <div className='w-24'></div>
          <div className='w-36'></div>
        </div>

        {/* Table Body */}
        {data.map((dataObj) => (
          <Row key={dataObj.id} data={dataObj} />
        ))}
      </div>
    </div>
  )
}

export default Table
