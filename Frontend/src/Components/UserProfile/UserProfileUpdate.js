import {Form,Button,Row,Col} from 'react-bootstrap'
import './UserProfile.css';
import { useRef,useContext, Fragment } from 'react';
// import AuthContext from '../../Store/auth-context';
import { useSelector } from 'react-redux';
import { authActions } from '../../Store/auth-slice';

const UserProfileUpdate=()=>{
    // const authCtx=useContext(AuthContext)
    const authProfileName=useSelector(state=>state.auth.ProfileName)
    const authprofilePhotoUrl=useSelector(state=>state.auth.profilePhotoUrl)
    const authToken=useSelector(state=>state.auth.token)
    console.log(authToken)
    // console.log(authCtx.ProfileName)
    const inputNameRef=useRef('');
    const inputPhotoUrlRef=useRef('')
    
  
    const FormSubmitHandler=(event)=>{
        event.preventDefault();
       const enteredName=inputNameRef.current.value;
       const enteredPhotoUrl=inputPhotoUrlRef.current.value;
      console.log(authToken)
       
       let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
       fetch(url,{
           method:'POST',
           body:JSON.stringify({
            // idToken:authCtx.token,
            idToken:authToken,
            displayName:enteredName,
            photoUrl:enteredPhotoUrl,
            returnSecureToken:false
             }),
             headers:{
               'Content-Type':'application/json'
             }
       })
       .then((response)=>{
           if(response.ok)
           {
               return response.json()
               
           }
           else{
               return response.json().then((data)=>{
               let errorMessage='Authentication failed';
               throw new Error(errorMessage)
               })
           }
       })
       .then((data)=>{
        console.log(data);
        console.log("profile Updated")
       })
       .catch((err)=>{
           alert(err.message)
       })

      
    }

    const VerifyEmailHandler=()=>{
      let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
       fetch(url,{
           method:'POST',
           body:JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken:authToken,
            
             }),
             headers:{
               'Content-Type':'application/json'
             }
       })
       .then((response)=>{
           if(response.ok)
           {
               return response.json()
               
           }
           else{
               return response.json().then((data)=>{
                console.log(data)
               let errorMessage='Authentication failed';
               throw new Error(errorMessage)
               })
           }
       })
       .then((data)=>{
        console.log(data);
        alert("Verification email has been sent to your account")
       })
       .catch((err)=>{
           alert(err.message)
       })
    }
  
  
  return (
      <Fragment>
      <div className='profile-form'>
       <h5 className='mb-4'>Verify your Email id</h5>
       <Button onClick={VerifyEmailHandler}  className='mb-2'>Verify Email</Button>
       
      </div>

      <Form className='profile-form' onSubmit={FormSubmitHandler}>
        <h3>Enter contact details:</h3>
        <Form.Group controlId="formGridName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text"  placeholder="Enter Name" className='mb-2' ref={inputNameRef} defaultValue={authProfileName}/>
        </Form.Group>

        <Form.Group  controlId="formGridphoto">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control type="text" placeholder="Enter URL" className='mb-3' ref={inputPhotoUrlRef} defaultValue={authprofilePhotoUrl} />
        </Form.Group>
     
      
      <Button variant="primary" type="submit">
        Update
      </Button>
      </Form>
      </Fragment>
  )
}
export default UserProfileUpdate;