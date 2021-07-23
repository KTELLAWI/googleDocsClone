import React from 'react'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { getSesssion , useSession,signOut } from 'next-auth/client'



export default function Header() {
    const [session]= useSession()
    return (
        <header className=" sticky top-0 z-50 flex items-center px-4 py-2 shadow-lg bg-white  justify-evenly" >
        <Button
        color="gray"
        buttonType="outline"
        iconOnly={true}
        ripple='dark'
        className="h-20 w-20 border-0  justify-start  ">
        <Icon name="menu" size="3xl" color="blue ml-3 "  />
        </Button>
        <Icon name="description" size="4xl" pl-2  color="blue" />
        <h1 className=' text-greay-700 text -2xl'>Docs</h1>
        <div className=' ml-3 md:mx-20 flex flex-grow  items-center  p-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md '>
            <Icon name="search" size="3xl" ml-2 color="gray" />
            <input type="text" placeholder='search' className='flex-grow px-2 text-base  bg-transparent outline-none'  />
        </div>
        <Button
        color="gray"
        buttonType="outline"    
        rounded={true}
        iconOnly={true}
        ripple='dark'
        className="  h-20 w-20 border-0">
        <Icon name="apps" size="3xl"  color="gray" />
        </Button>
        <div>
            
        </div>
        <img
            onClick={signOut} 
            loading="lazy"
            className="  cursor-pointer h-12 w-12 rounded-full "
            src={session?.user?.image}
            alt=''
        />
    




            
        </header>
    )
}
