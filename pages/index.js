import Head from 'next/head'
import{useState} from 'react' 
import Header from '../components/Header'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from 'next/image'
import { getSession , useSession } from 'next-auth/client'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import Login from '../components/Login'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import db from '../firebase'
import firebase from 'firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'
//import {useRouter} from 'next/dist/client/router'




export default function Home() {
  const [session] = useSession();
  const [showModal,setShowModal]= useState(false)
  const [input,setInput]= useState('')
  
  if (!session ) return <Login/> 
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp','desc'))
   console.log('snapshot',snapshot)
  const createDocument =()=>{
   if (!input) return;
    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      fileName: input,
     timestamp:firebase.firestore.FieldValue.serverTimestamp()

    })
    setInput('')
    setShowModal(false)
  };
  const model = (
    <Modal
    size="regular"
    active={showModal}
    toggler={()=>setShowModal(false)}
    >
                 <ModalBody>
                 <input 
                 type="text"
                 value={input}
                 onChange={(e)=>setInput(e.target.value)} 
                  placeholder="Enter the Name of Document"
                  className="outline-none w-full"
                  onKeyDown={(e)=>e.key == "Enter" && createDocument()}
                 />
                      
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={createDocument}
                        ripple="light"
                    >
                        Create 
                    </Button>
                </ModalFooter>

    </Modal>
  )
  
  return (
    <div >
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {model}
      <section className='bg-[#f8f9fa] pb-10 px-10 '>
          <div className='max-w-3xl mx-auto'>
            <div className='flex items-center justify-between py-6' >
                <h2 className='text-gray-700  text-lg'>Start a new Documents</h2>
                <Button
                  color="gray"
                  buttonType="outline"    
                  iconOnly={true}
                  ripple='dark'
                  className="border-0">
                  <Icon name="more_vert" size="3xl"  color="gray" />
                  </Button>


            </div>
            <div onClick={() =>setShowModal(true)}
             className='relative h-52 w-40 border-2 cursor-pointer hover:drop-shadow-lg hover:border-blue-700 '>
              <Image
                src='https://links.papareact.com/pju'
                layout='fill'
              />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>

            </div>
        </section>
         <section className='bg-white px-10 md:px-0'>
           <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
           <div className='flex items-center justify-between pb-5'>
             <h2 className='font-medium flex-grow  ml-1'> My Documents </h2>
             <p className='mr-12'>Date created </p>
             <Icon className='mr-4' name="folder" size="3xl"  color="gray" />
           </div> 

           {snapshot?.docs.map((doc)=>(
             <DocumentRow
               key={doc.id}
               id={doc.id}
               fileName={doc.data().fileName}
               date={doc.data().timestamp}
             />
           ))}
           </div>

         </section>

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