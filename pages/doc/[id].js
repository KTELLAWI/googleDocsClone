import React from 'react'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from 'next/dist/client/router'
import db from '../../firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { getSession , useSession } from 'next-auth/client'
import Login from '../../components/Login';
import TextEditor from '../../components/TextEditor'

export default function Doc() {
    const router = useRouter();
    const {id} = router.query;
    const [session] = useSession();
    if (!session ) return <Login/> 
  const [snapshot ,loadingSnapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(id)
  )
    if(!loadingSnapshot && !snapshot?.data()?.fileName){
        router.replace('/')
    }
    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
            <span onClick={() => router.push(`/`)}
            className="cursor-pointer">
             <Icon name="description" size="5xl" color="blue"  />

            </span>

            <div className='flex-grow px-2'>
                <h2>{snapshot?.data()?.fileName}</h2>
                <div className='flex items-center text-sm space-x-1 -ml-1 text-gray-600'>
                    <p className='option'>File</p>
                    <p className='option'>Edit</p>
                    <p className='option'>View</p>
                    <p className='option'>Insert</p>
                    <p className='option'>Formar</p>
                    <p className='option'>Tools</p>
                </div>
            </div>
            <Button
                    color="lightBlue"
                    buttonType="filled"
                    siz="regular" 
                    className=" sm:inline-flex  h-10"
                    rounded={false}
                    iconOnly={false}
                    block={false}
                    ripple='light'
                 >
            
            
                <Icon name="people" size="md" color="blue ml-3 "  />
                SHARE
            </Button>
            <img  className=" rounded-full  cursor-pointer h-10 w-10 ml-2"src={session.user.image} alt="" />
            
        



            </header>
            <TextEditor/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
      return{
        props:{
          session,
        }
      }  
  }
