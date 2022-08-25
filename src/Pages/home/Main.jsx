import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getPost} from '../../Redux/modules/postSlice'
import PostList from './PostList';


function Main() {
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  
  useEffect(() => { 
    dispatch(getPost())
  }, [dispatch])


    //redux
  const { posts } = useSelector((state) => state.post)

  
  if(posts.length ===  0){
    return (
      <div>
      <h1>로딩중!</h1>
    </div>
    )
  }
  // console.log('전체게시글',posts && posts.data.totalElements)
  // console.log('토탈페이지',posts&& posts.data.totalPages)
  // console.log(posts&& posts.data)
  
  // const pageableInfo = posts && posts.data.pageable;
  // console.log(pageableInfo)
  return (
    
    <div>
      <MainContainer >      
        {/* 카드 컴포넌트입니다 */}
        {posts.data && posts.data.map((data, i) => { return <PostList data={data} key={i}  /> })
        }
      </MainContainer>

      {/* 페이지네이션입니다 */}
      {/* <PaginationPosition>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className='page-link' href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only"></span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only"></span>
              </a>
            </li>
          </ul>
        </nav>
      </PaginationPosition> */}
    </div>
        );
}

const MainContainer = styled.div``

const PaginationPosition = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`

export default Main