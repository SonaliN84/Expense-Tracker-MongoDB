import {render,screen} from '@testing-library/react';
import UserProfileUpdate from './UserProfileUpdate';
import { Provider } from 'react-redux';
import store from '../../Store/index'
import { BrowserRouter } from 'react-router-dom';

test('render "Enter contact details:" as a text',()=>{
    render(
    <BrowserRouter><Provider store={store}>
        <UserProfileUpdate/>
    </Provider>
    </BrowserRouter>)
       const element=screen.getByText('Enter contact details:')
       expect(element).toBeInTheDocument();
})