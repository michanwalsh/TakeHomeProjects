import React, { useState, useEffect, useMemo } from "react";
import LINES from "./data.jsx";

export default function App() {

  const [startTime, setStartTime] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [sentence, setSentence] = useState(
    LINES[Math.floor(Math.random() * (LINES.length - 1)) + 0].replace("‘", "'").replace("’", "'")
  );
  const chars = useMemo(() => [...sentence], [sentence]);
  const [curCharIndex, setCurCharIndex] = useState(0);
  const words = Math.floor(curCharIndex/5);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const curChar = sentence[curCharIndex];
  const charsPerSecond = secondsElapsed>0 ? (curCharIndex/secondsElapsed).toFixed(1) : 0;
  const wordsPerMinute = secondsElapsed>0 ? Math.floor((words*60)/secondsElapsed) : 0;
  
  const [sessionChars, setSessionChars] = useState(0);
  const [sessionWords, setSessionWords] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const sessionWPM = sessionSeconds>0 ? Math.round((sessionWords*60)/sessionSeconds) : 0;
  const sessionCPS = sessionSeconds>0 ? (sessionChars/sessionSeconds).toFixed(1) : 0;

  const totalChars = sessionChars+curCharIndex;
  const totalWords = sessionWords+words;
  const totalSeconds = sessionSeconds + secondsElapsed;
  const totalWPM = totalSeconds>0? Math.round((totalWords*60)/totalSeconds) : 0;
  const totalCPS = totalSeconds>0? (totalChars/totalSeconds).toFixed(1) : 0;

  useEffect(() => {
    function handleKeyDown(event) {
      if (!hasStarted && !startTime) {
        const currentTime = Date.now();
        setStartTime(currentTime);
        setHasStarted(!hasStarted);
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
      
}, [hasStarted]);
  
  useEffect(() => {
    let interval = null;

    // because `isFinished` is a state variable, when it changes
    // this useEffect will first unmount which calls the return function
    // to clearInterval, then it will run fresh.
    if (isFinished) {
      // What this means is that here, this `interval` variable will always
      // be null, because it's a new one on every run of this `useEffect`
      clearInterval(interval);
      return
    }
    if (hasStarted && startTime) {
      interval = setInterval(() => {
        setSecondsElapsed((Date.now()-startTime)/1000);
      }, 100); 
    }  else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, hasStarted, isFinished]);
  
  useEffect(() => {
    function handleKeyDown(event) {
      // You are missing this variable in your deps array, so
      // it won't run this effect when it's changed
      if (isFinished) {
        return;
      }
      
        console.log('curchar', curChar, event.key);
      if ( 
        event.key === curChar &&
        event.key === sentence[curCharIndex] &&
        event.key === chars[curCharIndex]
      )
      {
        setCurCharIndex(curCharIndex + 1);
        
        if (curCharIndex === sentence.length - 1) {
          handleFinishSentence();
          
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [curChar, curCharIndex]);

  function handleFinishSentence() {
    setIsFinished(true);
    setSessionWords(sessionWords+(Math.floor(chars.length)/5));
    setSessionChars(sessionChars+chars.length);
    setSessionSeconds(sessionSeconds+secondsElapsed);
    generateSentence();
  }
  
  function generateSentence() {
    const newSentenceIndex = Math.floor(Math.random() * (LINES.length - 1)) + 0;
    const newSentence = LINES[newSentenceIndex].replace("‘", "'").replace("’", "'");
    setSentence(newSentence);
    setStartTime(null);
    setHasStarted(false);
    setCurCharIndex(0);
    setSecondsElapsed(0);
    setIsFinished(false);
  }

  return (
    <div style={{ backgroundColor: "white",borderRadius: '5px',backgroundColor: 'beige', border: "2px solid black", display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap:'10px'}}>
      <h1>
        Typing Test
      </h1>

      <div style={{display:'flex', justifyContent:'center', width: '100%', }}>
        <button
          style={{padding: '5px',borderRadius: '5px',fontSize: '18px', backgroundColor: 'lightgreen'}}
          onClick={() => handleFinishSentence()}
        >
          NEW SENTENCE
        </button>
      </div>
      <div style={{fontSize: '30px', color: 'grey', borderRadius: '5px', border: '1px solid black', padding: '10px', margin: '10px', width: '40px',           display: 'flex', justifyContent: 'center', alignContent: 'center'}}
        >{curChar === ' ' ? '_' : curChar}
      </div>

      

      <div style={{ display: "flex", justifyContent: 'center', alignContent: 'flex-start', borderRadius: '5px', width: "325px", flexWrap: "wrap", border: '1px solid black', padding: '5px', margin: '5px',wordBreak: 'keep-all',
    overflowWrap: 'break-word'}}>
        {chars.map((char, index) => (
          <div
            key={index}
            style={{
              color: index < curCharIndex ? "blue" : "black", fontSize: '18px',
              textDecoration: index < curCharIndex ? "none" : "underline",
              whiteSpace: "pre"
            }}
          >
            {char}
          </div>
        ))}
      </div>

      <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
        
      <div style={{fontSize: '18px',}}>
        <div style={{fontSize: '20px', textDecoration: 'underline'}}>Metrics:</div>
        <div>Words per minute:</div>
        <div>Characters per second:</div>
        <div>Seconds elapsed:</div>
      </div>

      <div style={{display: 'flex',fontSize: '18px', flexDirection: 'column', alignItems: 'flex-end'}}>
        <div style={{fontSize: '20px', textDecoration: 'underline'}}>Current: </div>
        <div>{wordsPerMinute} WPM</div>
        <div>{charsPerSecond} CPS</div>
        <div>{secondsElapsed.toFixed(1)} seconds</div>
      </div>
        
      <div style={{display: 'flex', fontSize: '18px',flexDirection: 'column',  alignItems: 'flex-end'}}>
        <div style={{fontSize: '20px', textDecoration: 'underline'}}>Running: </div>
        <div>{totalWPM} WPM</div>
        <div>{totalCPS} CPS</div>
        <div>{totalSeconds.toFixed(1)} seconds</div>
      </div>

      </div>
      
      
      
  
    </div>
  );
}
