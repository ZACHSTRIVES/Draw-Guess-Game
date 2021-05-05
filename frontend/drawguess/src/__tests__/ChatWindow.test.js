import ChatWindow from '../ChatWindow';
import '@testing-library/jest-dom/extend-expect';
import mockAxios from 'jest-mock-axios';

const message = [ 
    {   
    id: 0,
    user: "john",
    type: 'msg',
    text: "Testing message",
}]

it('Enter room notification works', () =>{
    
});