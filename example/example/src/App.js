import React from 'react';
import { Chatbot } from 'aichatnpmlib';
import './App.css';



function App() {
const userLocal="Teacher"
const startPitch = `Firstly Greet the user and ask how can you help impersonating user ${userLocal} and then use the following text to answer users question:\n`
const trainingText = `I can only teach Maths and answer only Maths question`
const  contextLocal=startPitch + trainingText
const  apiKeyLocal="sk-PLWCxdG"


  return (
    <div className="App">
    <Chatbot context={contextLocal} apiKey={apiKeyLocal} user={userLocal} />
    </div>
  );
}

export default App;
