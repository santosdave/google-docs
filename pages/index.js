import Header from '../components/Header';
import Head from 'next/head';
import Button from '@material-tailwind/react/Button';
import {useState} from "react";
import Icon from '@material-tailwind/react/Icon';
import Image from "next/image";
import Login from "../components/Login";
import DocumentRow from "../components/DocumentRow";
import {getSession, useSession} from 'next-auth/client';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import Modalfooter from "@material-tailwind/react/Modalfooter";
import {db} from "../firebase";
import {useCollectionOnce} from  "react-firebase-hooks/firestore";
import firebase from "firebase";
export default function Home() {
  const [session]= useSession();
  
  if(!session) return <Login/>;
  const [showModal, setShowModal]= useState(false);
  const [input, setInput]= useState("");
  const [snapshot]=useCollectionOnce(db.collection("userDocs").doc(session.user.email).collection("docs").orderBy("timestamp","desc"));
  const createDocument= ()=>{
    if(!input) return;
    
    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setShowModal(false);

  };
  const modal=(
    <Modal
    size="sm"
    active={showModal}
    toggle={()=>setShowModal(false)}
    >
      <ModalBody>
        <input
         value={input}
         type="text"
         placeholder="Enter Name of Document..."
         className="outline-none w-full"
         onChange={(e)=>setInput(e.target.value)}
         onKeyDown={(e)=>e.key==="Enter" && createDocument()}
        />
      </ModalBody>
      <Modalfooter>
        <Button
        color="blue"
        buttonType="link"
        onClick={(e)=>setShowModal(false)}
        ripple={"dark"}
        >
          Cancel
        </Button>
        <Button
        color="blue"
        onClick={createDocument}
        ripple={"light"}
        >
          Create
        </Button>
      </Modalfooter>
    </Modal>
    
  ) 
  
  return (
    <div >
      <Head>
        <title>Odoo Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      {modal}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
            <div className=" flex items-center justify-between py-6">
              <h2 className="text-gray-700 text-lg">Start new Document</h2>
              <Button
                color="gray"
                buttonType="outline"
                iconOnly={true}
                ripple={"dark"}
                className="border-0"
              >
                <Icon name="more_vert" size="3xl"/>
            </Button>
            </div>
            <div>
              <div onClick={()=> setShowModal(true)} className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
                <Image src= "https://links.papareact.com/pju" layout="fill"/>
              </div>
              <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
            </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
          {snapshot?.docs.map(doc =>(
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

export async function getServerSideProps(context){
  const session=await getSession(context);
  return{
    props:{
      session
    }
  }
}