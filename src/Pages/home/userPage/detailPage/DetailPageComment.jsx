/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { __getComment, __deleteComment } from '../../../../Redux/modules/comment'
import { __geteCommentLike , __postCommentLike } from "../../../../Redux/modules/commentLike"
import 사용자기본로고 from '../../../../Image/사용자 기본로고.jpg'

const DetailPageComment = ({reload, setReload, data}) => {
// console.log(data)

const dispatch = useDispatch()
const {isLoading, error, comments} = useSelector((state)=>state.comments)

console.log(isLoading , error, comments)


useEffect(()=>{
    dispatch(__getComment(data.id))

},[reload])

if ( isLoading ) {
    return (
        <div></div>
    )
}

if (comments.length === 0) {
    return (
        <div></div>
    )
}

    return (
        <div style={{ display: 'flex' ,flexDirection:'column', justifyContent: 'space-between', marginLeft: '10px', marginTop: '5px' }}>

        {
            comments?.map((val)=>
                <div key={val.id} style={{ display: 'flex', margin:'0 0 20px 0'}}>
                    <IdPersonImg src={ data.profileImage !== null ? data.profileImage : 사용자기본로고 } ></IdPersonImg>
                    <div style={{width:'90%'}}>
                        <span style={{ marginLeft: '5px', fontWeight: '700' }}>{val.nickname}</span>
                        <span style={{ marginLeft: '5px' }}>{val.content}</span>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{ marginLeft: '5px', marginTop: '4px', fontSize:'smaller', color:'#a7a7a7', marginRight: '10px', width:'20%'}}> 좋아요 {val.likesCount}개</div>
                            <DeleteComment type='button' onClick={()=>{
                                const payload = { postId:data.id, commentId:val.id }
                                dispatch(__deleteComment(payload))
                                setTimeout(() => {
                                    setReload(!reload)
                                }, 500);
                            }}><FontAwesomeIcon icon={faTrashCan} /></DeleteComment>
                        </div>
                    </div>

                    {   val.liked === false ? 
                        <>
                        <img src='images/heart.png' style={{ width: '21px', height: '21px' ,marginRight:'13px'}} type="button"
                        onClick={()=>{
                            const payload = { postId: data.id, commentId: val.id }
                            dispatch(__postCommentLike(payload))
                            setTimeout(() => {
                                setReload(!reload)
                            }, 500);
                            }} ></img>
                        </> : 
                        <>
                        <img src='images/colorHeart.png' style={{ width: '16px', height: '16px' ,marginRight:'15px'}} type="button"
                        onClick={()=>{
                            const payload = { postId: data.id, commentId: val.id }
                            dispatch(__postCommentLike(payload))
                            setTimeout(() => {
                                setReload(!reload)
                            }, 500);
                            }} ></img>
                        </>
                    }

                </div>
            )
        }
            
        </div>
    )
}

const IdPersonImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`

const DeleteComment = styled.div`
    width: 90%;
    font-weight: 800;
    margin-left: 6px;
    opacity: 0;
:hover {
opacity: 1;
}
`

export default DetailPageComment