// const initialState = {
//   state: false
// }

// const addBtnChange = (state = initialState, action) => {
//   console.log(action.type)
//   switch (action.type) {
//     case 'ADD_BTN':
//       return {
//         state : true
//       }
//     default:
//       return state
//   }
// }

// export default addBtnChange;

import React,{ createContext } from 'react'


export const ModalsStateContext = createContext([]);

// modal을 열고 닫는 함수
export const ModalsDispatchContext = createContext({
    open: () => {},
    close: () => {}
});