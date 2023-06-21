import {createSlice} from "@reduxjs/toolkit";

const initialToken=localStorage.getItem('token')
const initialIsPremium=localStorage.getItem('isPremium')
console.log("initial ",typeof initialIsPremium)
const convertToBooleanIsPremium=(initialIsPremium=="true")
const initialActivePage=localStorage.getItem('activePage')
const initialLimit=localStorage.getItem('limit')

const userIsLoggedIn=!!initialToken;
const initialAuthState={
  token:initialToken,
  isLoggedIn:userIsLoggedIn,
  ProfileName:'',
  profilePhotoUrl:'',
  isPremium:convertToBooleanIsPremium,
  activePage:initialActivePage,
  limit:initialLimit,
  total:0
}
const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
      login(state,action){
        state.token=action.payload.token;
        state.isPremium=action.payload.isPremium;
        state.isLoggedIn=true;
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('isPremium',action.payload.isPremium)
        state.activePage=1
        localStorage.setItem('activePage',state.activePage)
        localStorage.setItem('limit',5)
        state.limit=5;
        
      }, 
      logout(state){
       state.token=null;
       state.isLoggedIn=false;
       localStorage.removeItem('token')
       localStorage.removeItem('isPremium')
       localStorage.removeItem('activePage')
       localStorage.removeItem('limit')
      
      },
      setProfileName(state,action){
        state.ProfileName=action.payload;
      },
      setprofilePhotoUrl(state,action){
        state.profilePhotoUrl=action.payload;
      },
      setIsPremium(state){
        state.isPremium=true;
        localStorage.setItem('isPremium',true)
      },
      setActivePage(state,action){
        state.activePage=action.payload;
        localStorage.setItem('activePage',action.payload)
    },
    setLimit(state,action){
      state.limit=action.payload
      localStorage.setItem('limit',action.payload)
    },
    setTotal(state,action)
    {
      state.total=action.payload
    }
      
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;