import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';


export default function Cell(props) {
  
  const colors = ['white', 'red', 'black'];

  return (
    <div class="cell"  style ={{pointerEvents: props.disabled ? 'none' : 'auto',backgroundColor: colors[props.player]}} onClick={()=>props.fillColumn( props.j)} 
    >
    </div>
  
  
  );
};