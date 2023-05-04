import React from 'react'
import './UseTable.css'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import Lottie from 'lottie-react';

const UseTable = ({header, data, handleShowEdit}) => {
  return (
    <table  className='AdminUserTable' >
      <thead>
        <tr>
            {header?.map((item, index)=>(
                <th key={index} colSpan={item?.name== "Actions" && 2} className="UseTable_tableheader">{item?.name}</th>
            ))}
          {/* <th className="UseTable_tableheader">First Name</th>
          <th className="UseTable_tableheader">Last Name</th>
          <th className="UseTable_tableheader">Username</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((each, index)=>{
             return(
             <tr key={index}>
            {header?.map((item)=>{
                switch(item?.name) {
                    case 'Deal name':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Recipient':
                        return (<td className='useTable_tableDetails'><img src={each?.imgRecip} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.recipient}</td>);
                    case 'Details':
                        return (<td className='useTable_tableDetails'>{each?.description}</td>);
                    case 'Amount':
                        return (<td className='useTable_tableDetails'>{each?.firstname}</td>);
                    case 'Payment':
                        return (<td className='useTable_tableDetails'>{each?.surname}</td>);
                    case 'Status':
                        return (<td className='useTable_tableDetails'>{each?.email}</td>);
                        case '':
                          return (<>
                          <td className='useTable_tableDetails'><button className='useTable_tableDetailsLink'>Details</button></td>
                          </>)
                }
            })}
            
          </tr>
          )
})}
        
      </tbody>
    </table>
  )
}

export default UseTable