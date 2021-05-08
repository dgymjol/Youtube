import React , { useState, useEffect} from 'react'
import Axios from 'axios';

import { Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled,LikeFilled } from '@ant-design/icons';

function LikeDislikes(props) {

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {}

  if(props.video){
    variable = {videoId :props.videoId , userId: props.userId}
  }else{
    variable = {commentId: props.commentId, userId: props.userId}
  }

  useEffect(()=>{

    Axios.post('/api/like/getLikes', variable)
      .then(response=>{
        if(response.data.success){
            // 좋아요 수
            setLikes(response.data.likes.length)

            // 내가 좋아요를 이미 눌렀는지
            response.data.likes.map(like=>{
              if(like.userId === props.userId){
                setLikeAction('liked')
              }
            })
        }else{
          alert('Likes에 정보를 가져오지 못했습니다.')
        }
      })

    Axios.post('/api/like/getDislikes', variable)
        .then(response=>{
          if(response.data.success){
              // 싫어요 수
              setDislikes(response.data.dislikes.length)

              // 내가 싫어요를 이미 눌렀는지
              response.data.dislikes.map(dislike=>{
                if(dislike.userId === props.userId){
                      setDisLikeAction('disliked')
                }
              })
          }else{
            alert('DisLikes에 정보를 가져오지 못했습니다.')
          }
        })
  },[])

  const onLike = () =>{
    // 클릭 안된 상태에서 클릭
    if(LikeAction === null){
      Axios.post('/api/like/uplike',variable)
        .then(response=>{
          if(response.data.success){
              setLikes(Likes+1)
              setLikeAction('liked')

              if(DisLikeAction !== null){
                setDisLikeAction(null)
                setDislikes(Dislikes-1)
              }

          }else{
            alert('Like를 올리지 못했습니다.')
          }
        })
    }else{
      Axios.post('/api/like/unLike',variable)
        .then(response=>{
          if(response.data.success){
              setLikes(Likes-1)
              setLikeAction(null)
          }else{
            alert('Like를 지우지 못했습니다.')
          }
        })
    }
  }

  const onDislike = ()=>{
    //클릭 된 상태에서 클릭.
    if(DisLikeAction !== null){
      Axios.post('/api/like/unDislike',variable)
        .then(response=>{
          if(response.data.success){
              setDislikes(Dislikes-1)
              setDisLikeAction(null)

          }else{
            alert('DisLike를 지우지 못했습니다.')
          }
        })
    }
    else{
      Axios.post('/api/like/upDislike',variable)
        .then(response=>{
          if(response.data.success){

              setDislikes(Dislikes + 1)
              setDisLikeAction("Disliked")

              if(LikeAction !== null){
                setLikeAction(null)
                setLikes(Likes-1)
              }
          }else{
            alert('DisLike를 올리지 못했습니다.')
          }
        })
    }
  }

  return(
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
        {LikeAction === 'liked' ?  <LikeFilled onClick = {onLike}/> : <LikeOutlined onClick = {onLike} /> }
        </Tooltip>
        <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Likes} </span>
      </span>

      <span key="comment-basic-dislike">
        <Tooltip title="DisLike">
          {DisLikeAction === 'disliked' ?  <DislikeFilled onClick={onDislike} /> : <DislikeOutlined onClick={onDislike}/> }
        </Tooltip>
        <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Dislikes} </span>
      </span>
    </div>

  )
}

export default LikeDislikes