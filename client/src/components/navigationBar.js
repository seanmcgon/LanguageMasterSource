// needs 3 components 
//logo on top
//create class button 
//my account button
//this is for teacher view 

import React from "react";
import Logo from "./components/logo";


export default function NavigationBar() {
    return(
        <>
        <Logo/>

        <button type="button" class="btn btn-create-class">Create New Class</button>
        <button type="button" class="btn btn-my-account">My Account</button>
        </>
    )
}

