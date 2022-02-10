import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecommendBeer.css"
import axios from "axios";
import { useState } from "react";


const RecommendBeer = () => { // 변수명 수정필요
  const [beerList, setBeer] = useState()
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    // className: "center",
    // centerMode: true,
    // centerPadding: "60px",
    fade:true, //center랑 중복 불가능
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect( () => {
    const getRecommend = async () => {
      const RECOMMEND_BEER = process.env.REACT_APP_SERVER + ':8000/v1/recommend/1' // memberId 추후 수정
      const headers = {
        'Accept': "application/json; charset=UTF-8"
      }
      console.log("111")
      const { data: recommendBeer} = await axios.get(RECOMMEND_BEER, headers)
      setBeer(recommendBeer.recommend)
    }
    getRecommend()
  }, [])

  useEffect( () => {
    CreateBubble()
  }, [])

  return(
    <div className="SlickTest">
        <div id="bubbles">
          <h3 className="recommendtitle" align="center">Recommend Beer</h3>
          <Slider {...settings}>
            {
              beerList&&beerList.map((beerid, i) => 
                <CustomSlide beerid={beerid} key={i} />
              )
            }
          </Slider>
        </div>
    </div>
  )
}


function CustomSlide(props) {
  const BEER_DETAIL_URL = process.env.REACT_APP_SERVER + ':8080/v1/beer'
  const [imgSrc, setImgSrc] = useState()
  useEffect( () => {
    const fetchData = async ()=>{
      const { data : beerDetail } = await axios.get(`${BEER_DETAIL_URL}/${props.beerid}`)
      setImgSrc(beerDetail.photoPath)
    }
    fetchData();
  }, [])
  return(
    <div {...props}>
      <img className="slideImg" src={imgSrc} alt=""/>
    </div>
  )
}



function CreateBubble(){
  let bubbleEnd
  const bubbles = document.getElementById("bubbles"),
  
  randomN = function(start, end){
    return Math.random()*end+start;
  }
  let i = 0
  let generateBubble = function(){
    if(i < 25){
      const bubble = document.createElement("div"),
          size = randomN(5, 10);
          bubble.setAttribute("style","width: "+size+"px; height: "+size+"px; left:"+randomN(size, bubbles.offsetWidth-(size+5) )+"px;"); // 방울크기, 방울을 어느 위치에서 띄울것인지
          bubble.setAttribute("class", "bubble")
      bubbles.appendChild(bubble);
      i++;
    }else{
      clearInterval(bubbleEnd); // 충분한 방울 생성되면, setInterval 반환값을 인자로 받아 setInterval 종료
    }
  };

  bubbleEnd = setInterval(generateBubble, 500); // generateBubble를 시간을 두고 실행 
}


export default RecommendBeer;
