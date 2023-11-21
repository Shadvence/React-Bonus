import React, { useRef, useState } from 'react';
import "./App.css"

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAKIlMEjYr5J4yWF6oHaedwMhpxdP9C4_w",
  authDomain: "react-bonus-8ff20.firebaseapp.com",
  databaseURL: "https://react-bonus-8ff20.firebaseio.com",
  projectId: "react-bonus-8ff20",
  storageBucket: "react-bonus-8ff20.appspot.com",
  messagingSenderId: "945530617971",
  appId: "1:945530617971:web:8510578eb44e27a2752a06",
  measurementId: "G-R528BRJ55D"
})

const firestore = firebase.firestore();

function App() {
  return (<>
    <div>
      <section className='chats'>
          <Chats></Chats>
      </section>
    </div>
    <div className='App'>
      <section className='chatRoom'>
        <ChatRoom></ChatRoom>
      </section>
    </div>
  </>
  );
};

function Chats() {
  const chats = ['User 1', 'User 2', 'User 3'];

  return (
    <div className='groups'>
      <h2>Chat Groups</h2>
      <ul>
        {chats.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
  <>
    <div className='room'>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <div ref={dummy}></div>

    </div>
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write here" />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>
  </>
  )
}

function ChatMessage(props) {
  const { text } = props.message;


  return (<>
    <div className='sent'>
      <img src="https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg" alt="pokemon"></img>
      <p>{text}</p>
    </div>
  </>)
}

export default App;
