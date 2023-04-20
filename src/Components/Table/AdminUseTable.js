import React from 'react'
import Table from 'react-bootstrap/Table';
import './UseTable.css'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const AdminUseTable = ({header, data, handleShowEdit}) => {
  return (
    <table className='AdminUserTable'>
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
                    case 'Player name':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Position':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Nationality':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Date':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Amount':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Purpose':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Transaction ID':
                        return (<td  className='useTable_tableDetails'>{each?.dealname}</td>);
                    case 'Images':
                        return (<td  className='useTable_tableDetails'>{each?.dealname} Images</td>);
                    case 'Video':
                        return (<td  className='useTable_tableDetails'>{each?.dealname} Video</td>);
                    case 'View Details':
                        return (<td  className='useTable_tableDetails'><Link className='AdminPage_TableViewDetails'>View Details</Link></td>);
                    case 'Scout':
                          return (<td className='useTable_tableDetails'><p className='AdminUse_TableComp'><img src={each?.imgRecip} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.scoutname}</p></td>);
                    case 'Initial Offer':
                        return (<td className='useTable_tableDetails'>{each?.InitialOffer}</td>);
                    case 'Current Offer':
                        return (<td className='useTable_tableDetails'>{each?.CurrentOffer}</td>);
                    case 'Active Negotiaties':
                          return (<td className='useTable_tableDetails'><p className='AdminUse_TableComp'><img src={each?.chat} style={{marginRight: '10px'}} width='25px' height='25px' alt='Recipient image'/>{each?.number}</p></td>);
                    case 'Payment':
                        return (<td className='useTable_tableDetails'>{each?.surname}</td>);
                        
                }
            })}
            
          </tr>
          )
})}
        
      </tbody>
    </table>
  )
}

export default AdminUseTable