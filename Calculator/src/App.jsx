import './App.css'
import React, {useState, useEffect, useRef} from 'react'

export default function App() {

  const [display, setDisplay] = useState(0);
  const [curOp, setCurOp] = useState(null);
  const [prevNum, setPrevNum] = useState(0);
  const [acceptingNumber, setAcceptingNumber] = useState(false);
  const [isNeg, setNeg] = useState(false);

  function handleNum(num) {
    if (isNeg && display===0 && num!==0) {
      setAcceptingNumber(true);
      setDisplay(-num);
      return
    }
    
    if (display > 10**9 || display < (-1 * 10**9)) {return}
    if (acceptingNumber) {
      if (isNeg) {setDisplay(display*10 - num)}
      else {setDisplay(display*10 + num);}
    }
    else {
      if (curOp) {
        setPrevNum(display);
      }
      console.log('num: ', num);
      setDisplay(num);
      setAcceptingNumber(true);
    }
  };

  function handleClear () {
    setDisplay(0);
    setPrevNum(null);
    setCurOp(null);
    setAcceptingNumber(false);
    setNeg(false);
  }

  function trimNumber(num) {
    const numString = num.toString();
    if (numString.length <= 10) {
      return numString;
    } else {
      return numString.slice(0, 10);
    }
  }

  function handleSetDisplay(num) {
    if (num > 10**9 || num < (-1 * 10**9) ) {
      setDisplay('ERROR');
      setPrevNum(null);
      setCurOp(null);
      setAcceptingNumber(false);
      return
    } 
    setDisplay(trimNumber(num));
    setPrevNum(null);
    setAcceptingNumber(false);
  }

  function performCalc () {
    if (curOp === '+') {
      handleSetDisplay(Number(prevNum) + Number(display));
    }
    else if (curOp === '-') {
      handleSetDisplay(prevNum - display);
    }
    else if (curOp === '*') {
      handleSetDisplay(prevNum * display);
    }
    else if (curOp === '/') {
      handleSetDisplay(prevNum / display);
    }
  }
  function handleOp (op) {
    if (op==='-' && !acceptingNumber && display===0 && !prevNum) {
      setNeg(true);
      return; 
    }
    if (prevNum && curOp) {
      performCalc();
      setPrevNum(null);
    }
  
    setCurOp(op);
    setAcceptingNumber(false);
    setNeg(false);
  }
 
  return (
    <main>
      <div className='calculator'>
        <div className='display'>{display}</div>
        <div className='row'>
          <button className='num' onClick={()=>handleNum(7)}>7</button>
          <button className='num'  onClick={()=>handleNum(8)}>8</button>
          <button className='num'  onClick={()=>handleNum(9)}>9</button>
          <button  className='op' onClick={()=>handleOp('+')}>+</button>
        </div>
        <div className='row'>
          <button  className='num' onClick={()=>handleNum(4)}>4</button>
          <button className='num'  onClick={()=>handleNum(5)}>5</button>
          <button className='num'  onClick={()=>handleNum(6)}>6</button>
          <button  className='op' onClick={()=>handleOp('-')}>-</button>
        </div>
        <div className='row'>
          <button className='num'  onClick={()=>handleNum(1)}>1</button>
          <button className='num'  onClick={()=>handleNum(2)}>2</button>
          <button className='num'  onClick={()=>handleNum(3)}>3</button>
          <button  className='op' onClick={()=>handleOp('*')}>*</button>
        </div>
        <div className='row'>
          <button className='num'  onClick={()=>handleNum(0)}>0</button>
          <button  className='clear' onClick={()=>handleClear()}>Clr</button>
          <button className='op'  onClick={()=>handleOp('/')}>/</button>
          <button  className='op' onClick={()=>handleOp('=')}>=</button>
        </div>
      </div>
    </main>
  )
}
