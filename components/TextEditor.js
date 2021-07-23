import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/dist/client/router'

//import { Editor } from "react-draft-wysiwyg";
import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(()=> import("react-draft-wysiwyg").then((module)=> module.Editor),
{
    ssr:false
}
);
import {EditorState} from 'draft-js'
import db from '../firebase'
import {convertFromRaw,convertToRaw} from 'draft-js'
import { getSession , useSession } from 'next-auth/client'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

function TextEditor() {
    const [session] = useSession();

    const router = useRouter();
    const {id} = router.query
    const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(id))

    const [editorState,setEditorState] = useState(EditorState.createEmpty( ));
    const onEditorStateChange =(editorState)=> {
        setEditorState(editorState)
        db.collection('userDocs').doc(session.user.email).collection('docs').doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent()),

        },{
            merge:true
        })


    }

    useEffect (()=>{
        if (snapshot?.data()?.editorState) {
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(snapshot.data().editorState)
                )
            )
        }
    },[snapshot])
    return (
         <div className='bg-gray-100 min-h-screen pb-16'>
          <Editor
              toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto "
              editorClassName="mt-6   p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}


          />
        </div>
    ) 
}

export default TextEditor
