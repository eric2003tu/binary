import React, { useEffect, useState } from 'react'
import { IoMdCloudCircle } from "react-icons/io";
import { FaSortDown } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserFriends } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dashClicked, setDashClicked] = useState(true)
  const [userClicked, setUserClicked] = useState(false)
  const [cardClicked, setCardClicked] = useState(false)
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the users once the component mounts
    fetch('https://employee-management-app-ghrg.onrender.com/api/user/users')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        setUsers(data); // Store the fetched users in the state
      })
      .catch(function(error) {
        console.error('Network issue: ', error);
      });
  }, []); 

  return (
    <div className='h-screen'>
      <div className='top-0 p-[10px] z-[1000] flex flex-col border-b-[0.3px] border-b-gray-300 gap-[100%] w-full h-fit bg-white sticky'>
      <div className='top-0 self-end flex flex-row gap-4'>
        <div className='w-[40px] h-[40px] rounded-full bg-gray-500'></div>
          <h1 className=' text-[#040454] text-[24px]'>Hi, josure</h1>
          <FaSortDown size={30} className='text-[#040454]'/>
          </div>
          <div className='mt-[-35px] self-start flex flex-row'>
            <IoMdCloudCircle size={36} onClick={function(){
              navigate('/')
            }} className='text-[#5cde20] cursor-pointer'/>
        <h1 className=' text-[24px]   text-[#040454] '><span className='font-bold text-[#040454]'>Get</span>change</h1>
        </div>
      </div>
      <div className='w-full h-[89.5%] grid grid-cols-[1fr_8fr]'>
        
        {/* left nav */}

    <div className='h-full w-full flex pl-[5px] items-start flex-col bg-white overflow-auto'>
  <div className='flex flex-row mt-[50%]'>
    {dashClicked && <div className="h-15 w-1.5 bg-green-500 rounded-r-md"></div>}
    <LuLayoutDashboard size={35} onClick={function(){
      setDashClicked(true)
      setUserClicked(false)
      setCardClicked(false)
    }} className={dashClicked ? 'text-[#5cde20] mt-[13px] ml-[12px]' : 'text-[#40407a] mt-[13px] ml-[12px]'}/>
  </div>
  
  <div className='flex flex-row mt-[50%]'>
    {userClicked && <div className="h-15 w-1.5 bg-green-500 rounded-r-md"></div>}
    <FaUserFriends size={35} onClick={function(){
      setDashClicked(false)
      setUserClicked(true)
      setCardClicked(false)
    }} className={userClicked ? 'text-[#5cde20] mt-[13px] ml-[12px]' : 'text-[#40407a] mt-[13px] ml-[12px]'}/>
  </div>

  <div className='flex flex-row mt-[50%]'>
    {cardClicked && <div className="h-15 w-1.5 bg-green-500 rounded-r-md"></div>}
    <FiCreditCard onClick={function(){
      setDashClicked(false)
      setUserClicked(false)
      setCardClicked(true)
    }} size={35} className={cardClicked ? 'text-[#5cde20] mt-[13px] ml-[12px]' : 'text-[#40407a] mt-[13px] ml-[12px]'}/>
  </div>
  </div>

  {/* Right nav */}

  <div className={userClicked ? 'h-full w-full overflow-auto p-[10px] bg-[#f1f1f4]' : 'hidden'}>
    <div className=' flex flex-col w-full p-[20px] pt-[7px]'>
      <button type='button' className=' text-center self-end bg-[#5cde20] text-white text-[17px] font-bold pr-[25px] pl-[25px] p-[7px] rounded-[5px]'>
        Add New
        </button>
        <h1 className='text-[#040454] text-[17px] mt-[-40px]'>Employees</h1>
    </div>
    <div className=' flex flex-col w-full p-[20px] mt-[15px] bg-white'>
      <h1  className=' text-center self-end text-gray-600 text-[15px] p-[7px]'>
        62, Bonde Thomas, Surulere, Lagos
        </h1>
        <h1 className='text-[#040454] text-[18px] mt-[-40px] font-bold'>John Bakery Ventures</h1>
    </div>
    <div className=' flex flex-col w-full p-[10px] mt-[15px]'>
      <div className='self-end flex flex-row gap-1'>
      <h1  className=' text-center  text-gray-600 text-[15px] '>
        1 of 2
        </h1>
        <FaAngleLeft size={20} className='text-[#5cde20]'/>
        <FaAngleRight size={20} className='text-[#5cde20]'/>
        </div>
        <div className='  flex flex-row gap-2 mt-[-19px]'>
          <select name='role' className='bg-white w-fit p-[7px] border  border-y-gray-400 rounded-[5px] text-gray-600'>
            <option  value=''selected disabled>Change Role</option>
            <option value='Employee' className='hover:bg-[#5cde20]'>Employee</option>
            <option value='Employer' className='hover:bg-[#5cde20]'>Employer</option>
          </select>
          <button type='button' className='rounded-[5px] text-center self-end bg-[#5cde20] text-white text-[15px] font-bold pr-[25px] pl-[25px] p-[7px]'>Change</button>
          <input type='search' name='search' placeholder='Enter a staff name here...' className='text-gray-500 placeholder:text-gray-500 p-[7px] rounded-[5px] border border-gray-400 w-[260px] pr-[10px] bg-white'/>
        </div>
    </div>
    <table className='w-full h-fit mt-[10px]'>
      <thead className='p-[10px]'>
        <tr className='text-[#040454] border-b border-t'>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>ROLE</th>
        </tr>
      </thead>
      <tbody>
          {/* Render table rows dynamically using the users state */}
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className='text-center text-[18px]'>No users available</td>
            </tr>
          ) : (
            users.map((value, index) => (
              <tr key={index}>
                <td>{value.firstname}</td>
                <td>{value.lastName}</td>
                <td>{value.Email}</td>
                <td>{value.phone}</td>
                <td>{value.role}</td>
              </tr>
            ))
          )}
        </tbody>
    </table>
  </div>
  </div>
  </div>
  )
}

export default Dashboard
