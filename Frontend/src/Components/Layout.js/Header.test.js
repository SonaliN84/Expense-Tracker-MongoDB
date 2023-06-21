import {render,screen} from '@testing-library/react';
import Header from './Header';import { Provider } from 'react-redux';
import store from '../../Store/index'
import { BrowserRouter } from 'react-router-dom';

test('render "Expense Tracker" as a text',()=>{
    render(
    <BrowserRouter><Provider store={store}>
        <Header/>
    </Provider>
    </BrowserRouter>)
    const element=screen.getByText('Expense Tracker')
    expect(element).toBeInTheDocument();
})