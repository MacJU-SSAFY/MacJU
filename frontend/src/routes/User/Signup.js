import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../styles/Signup.css'

function Signup(props) {
  const VALIDATE_NICKNAME_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/validatenickname'
  const USER_SIGNUP_URL = process.env.REACT_APP_SERVER + ':8080/v1/member/signup'
  const userData = props.location.userData
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [nickname, nicknameChange] = useState("");
  const [age, ageChange] = useState("");
  const [gender, setGender] = useState("");
  const [AvailableNick, setAvailable] = useState()
  const [submitBtn, deactivateSubmitBtn] = useState(true)
  
  // nickname 변경
  const changeNickName = e => {
    nicknameChange(e.target.value);
  }

  // gender 변경
  const selectValue = e => {
    setGender(e.target.value); 
  }

  // 나이 변경
  const changeAge = e => {
    ageChange(e.target.value);
  }


  // 회원가입 버튼 누를시 동작
  const signupBtn = useCallback( async () => {
    try{
      if (age < 20) {
        alert("미성년자는 가입 할 수 없습니다")
        history.replace("/home")
        return // histroy로 home 넘어가면 DB update랑 store 막아놓기
      } 

      const singupData = { // 액세스 토큰 나중에 넣어줘야 함
        // "memberId": userData.member.kakaoMemberId,
        "age": age,
        "name": userData.member.nickName,
        "nickName": nickname
      }
      const headers = {
        headers: {
          "Accept" : "application/json;charset=UTF-8",
          "Content-Type" : "application/json;charset=UTF-8"
        }
      }
      const test = await axios.post(USER_SIGNUP_URL, singupData, headers)
      console.log(test)

    }catch{
      // 회원가입 실패시 알람 + 로그인 페이지 다시 이동
      alert("회원가입 실패")
      history.replace("/login")
    }
    dispatch({type:"loginSucess", userData:userData})
    history.push("/home")
  }, [age, userData, nickname, USER_SIGNUP_URL, dispatch, history])

  // 닉네임 수정할 때 버튼 막아놓고 시작
  useEffect( () => { 
    deactivateSubmitBtn(true)
    }, [nickname]
  )

  const validationNinkname = useCallback( async () => {
    try{
      const { data : nicknameStatus } = await axios.get(`${VALIDATE_NICKNAME_URL}/${nickname}`)
      console.log(nicknameStatus)
      if (nicknameStatus === "success") {
        setAvailable(true)
      }else {
        setAvailable(false)
      }
    }catch{
      console.log("중복확인 실패")
    }
  }, [nickname, VALIDATE_NICKNAME_URL])

  useEffect( () => {
    if (nickname) {
      validationNinkname()
    }else {
      setAvailable(false)
    }
    }, [nickname, validationNinkname]
  )

  useEffect( () => { // 수정필요
    if (AvailableNick && gender && age) {
      deactivateSubmitBtn(false)
    }
    }, [AvailableNick, nickname, gender, age]
  )

  return(
    <div className="Signup">
      <section className="signup_section layout_padding_signup">
        <div className="container">
          {/* Signup 제목 */}
          <div className="signup_heading_container">
            <h2>
              Signup
            </h2>
          </div>

          {/* 회원가입 입력창 */}
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <form action="./login">

                  {/* 별명 입력 */}
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NickName"
                      name="nickname"
                      value={ nickname }
                      onChange={ changeNickName }
                    />
                  </div>
                  
                  {/* 나이 입력 */}
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      name="age"
                      value={ age }
                      onChange={ changeAge }
                    />
                  </div>

                  {/* 성별 입력 */}
                  <div>
                    <select className="form-control nice-select wide" name="choice" onChange={selectValue}>
                      <option value="" disabled selected>
                        성별
                      </option>
                      <option value="man">
                        남자
                      </option>
                      <option value="woman">
                        여자
                      </option>
                    </select>
                  </div>

                  {/* 회원가입 완료 버튼 */}
                  <div className="btn_box">
                    <button disabled={submitBtn} onClick={signupBtn}>
                      SignUp Now
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* 추후 추가될 것 (이미지?) */}
            <div className="col-md-6">
              <div className="map_container ">
                <div id="signupImg">image띄우는 곳</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup;