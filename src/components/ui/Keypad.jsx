import React, { useEffect, useRef } from "react";
import { Block, f7, f7ready, Input, List, ListItem } from "framework7-react";

import "../../../node_modules/framework7/framework7-bundle.min.css"; // Assuming custom styles or from a package

import "../../../node_modules/framework7-plugin-keypad/framework7-keypad.min.css"; // Assuming custom styles or from a package

const PasscodePage = () => {
  // Refs for each input field
  const numpadRef = useRef(null);
 
useEffect(() => {
  let  numpad = f7.keypad.create({
    inputEl: numpadRef.current,
    valueMaxLength: 2,
     dotButton: false,
     openIn:"auto",
     backdrop:true,
     type:"calculator"
      
  });


}, [])

  // Function to open keypad on click
  const handleOpenKeypad = (keypadInstance) => {
   let  numpad = f7.keypad.create({
      inputEl: numpadRef.current,
      valueMaxLength: 2,
       dotButton: false,
       openIn:"auto",
       backdrop:false,
       type:"calculator",
       inline:true,
       toolbar:false
  
    });

    numpad.open();
  };

  return (
    <>
      <Input
            type="text"
            placeholder="Enter number"
            ref={numpadRef}
            onInput={() => handleOpenKeypad()}
          />
      

     

 

    
    </>
  );
};

export default PasscodePage;
