import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";
import Comment from "./Section/Comment";
import LikeDislikes from './Section/LikeDislikes';

function VideoDetailPage(props){

  const videoId = props.match.params.videoId
  const variable = { videoId: videoId }

  const [VideoDetail, setVideoDetail] = useState([])
  const [Comments, setComments] = useState([])

  useEffect(() => {

    axios.post("/api/video/getVideoDetail", data).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오지 못했습니다.");
      }
    });

    
  Axios.post('/api/comment/getComments', variable)
  .then(response=>{
    if(response.data.success){
      setComments(response.data.comments)
      console.log(response.data.comments);
    }else{
        alert('코멘트 정보 가져오기를 실패했습니다.')
    }
  })
  }, []);

  
  const refreshFunction = (newComment) =>{
    setComments(Comments.concat(newComment))
  }

  if (videoDetail.writer)  {
    
    console.log(videoDetail)

    const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

    return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${videoDetail.filePath}`}
          />
            <List.Item
              actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton]}>
          
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} alt="image"/>}
                title={VideoDetail.writer.name}
                destination={VideoDetail.description} />

            </List.Item>
            <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );}
  else{
    return(
          <div>...loading</div>
    )}
  
};

export default VideoDetailPage;
