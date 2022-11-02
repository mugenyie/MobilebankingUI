import React from 'react'
import PageTitle from '../components/PageTitle'

function SelectAccount() {
  return (
    <div>
        <PageTitle text={'Select Bank Account'} />
        <div className='flex flex-col border-y border-gray-200 cursor-pointer py-2'>
            <span>9943290423</span>
            <span>Saving</span>
        </div>
        <div className='flex flex-col border-y border-gray-200 cursor-pointer py-2'>
            <span>9943290423</span>
            <span>Saving</span>
        </div>
    </div>
  )
}

export default SelectAccount