import React,{ createContext, useContext } from 'react'

// Context 객체 만들기(리덕스에서 Store와 같은 역할)
// createContext 를 실행하면 Provider와 Consumer을 담고 있는 컨텍스트 객체가 생성
// Provider는 state나 action.type에 따른 dispatch 함수들을 value prop에 넣어서 제공하는 역할.
// Consumer는 Provider에 담긴 state와 dispatch 함수들을 필요한 컴포넌트에서 접근할 수 있게 만드는 
// 역할.
export const myContext = createContext();

//  useContext를 통해 context.Consumer을 사용하지 않고 간단히 컨텍스트에 접근가능
export const useMyContext = () => {
    return useContext(myContext)
}

// modal을 열고 닫는 함수, Context 객체에 값을 담아 제공하는 Provider
// Provider은 context의 뿌리
export const ModalAddOpen = ({ children }) => {
    const [btnOpen, setBtnOpen] = React.useState(false);
    const btnClickOff = () => setBtnOpen(false);
    const btnClickOn = () => setBtnOpen(!btnOpen);
    const value = {
        btnOpen,
        btnClickOff,
        btnClickOn
    };

    return (
        <myContext.Provider value={value} >
            {children}
        </myContext.Provider >
    )
};

