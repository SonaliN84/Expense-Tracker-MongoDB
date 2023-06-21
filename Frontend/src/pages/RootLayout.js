import { Fragment } from "react";
import Header from "../Components/Layout.js/Header";
const RootLayout=(props)=>{
return(
    <Fragment>
        <Header/>
        
        {props.children}
    </Fragment>
);
}
export default RootLayout;