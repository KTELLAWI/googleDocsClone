import React from 'react'
import Image from 'next/image'
import Button from "@material-tailwind/react/Button";

import { signIn } from 'next-auth/client'



export default function Login() {
    return (
        <div className='flex flex-col items-center justify-center  min-h py-2'>

        <Image
        src="https://links.papareact.com/1ui"
        height='300'
        width="550"
        objectFit='contain'

        />
         <Button
        color="blue"
        buttonType="filled"    
               ripple='light'
        className="mt-10 w-44"
        onClick={signIn}
        >
        Login
        </Button>
            
        </div>
    )
}
