import {createSlice} from '@reduxjs/toolkit';
const initialThemeState={
    theme:'true',
}
const themeSlice=createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
       toggleTheme(state){
        // if(state.theme==='light'){
        //    state.theme='dark';
        //    console.log(state.theme)
        // }
        // else(state.theme==='dark')
        // {
        //     state.theme='light';
        //     console.log(state.theme)
        //  }
        state.theme=!state.theme;
        localStorage.setItem('theme',state.theme)
       }
    }
})
export const themeActions=themeSlice.actions;
export default themeSlice.reducer;