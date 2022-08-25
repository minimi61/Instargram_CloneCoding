import React from 'react'
import styled from 'styled-components'
const Comment = () => {
  return (
    <>
      <CommentContainer>
        <CommentInner>
          <div>🙂</div>
          <CommentInput placeholder='댓글달기..'></CommentInput>
        </CommentInner>
        <SubmitButton>게시</SubmitButton>
    </CommentContainer>
    </>
  )
}
const CommentContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  width: 90%;
  border-top: 1px solid gray;
  display: flex;
  justify-content: space-between;
  `
const CommentInner = styled.div`
  display: flex;
  font-size: 22px;
  padding: 1rem;
`
const SubmitButton = styled.button`
  border: none;
  background-color: white;
  color: lightblue;
  font-size: 22px;  
`
const CommentInput = styled.input`
  border: none;
  outline: none;
  margin-left: 20px;

`

export default Comment