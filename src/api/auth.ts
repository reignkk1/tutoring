import axios from "axios";
import { useState, useEffect } from "react";

export interface IGetUser {
  id: string;
  img?: string;
  nickname: string;
  career: string;
  userClassification: string;
  ageGroup: string;
  email: string;
  gender: string;
  role?: string;
  studentPostResponseDtos: any;
  teacherPostResponseDtos: any;
}

const baseUrl = process.env.REACT_APP_BASE_URL;

//이메일 코드 인증
export const sendCode = async (email: string) => {
  try {
    const res = await axios({
      url: `${baseUrl}/auth/mail?email=${email}`,
      method: "get",
    });

    if (res.status === 200) {
      console.log(res.data);
      alert("이메일 인증코드를 보냈습니다.");
      return res.data.certificationCode;
    }
  } catch (error) {
    alert("인증 과정에 문제가 생겼습니다.");
  }
};

export const checkCode = (code: string, inputCode: string) => {
  return code === inputCode ? true : false;
};

//회원가입
export const signup = async (userData: any) => {
  try {
    const res = await axios({
      url: `${baseUrl}/member/join`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    });
    if (res.status === 200) {
      alert("회원가입 성공하셨습니다!");
      window.location.replace("/signin");
    }
  } catch (error) {
    console.log(error);
    alert("회원가입에 실패했습니다");
  }
};

//비밀 번호 찾기
export const findPwd = async (userData: any) => {
  const { id, password } = userData;

  try {
    const res = await axios({
      url: `${baseUrl}/member/modify-password`,
      data: { memberId: id, password: password },
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      alert("비밀번호가 변경되었습니다.");
      window.location.replace("/signin");
    }
  } catch (error) {
    alert("비밀번호 변경에 실패했습니다.");
    console.log(error);
  }
};

//로그인
export const signin = async (userData: any) => {
  try {
    const res = await axios({
      url: `${baseUrl}/auth/sign-in`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    });

    if (res.status === 200) {
      const token = res.data.token;

      localStorage.setItem("token", token);
      // 만료시간 30분
      const expiration = new Date(new Date().getTime() + 30 * 60 * 1000);
      localStorage.setItem("expiration", expiration.toISOString());

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("로그인 되셨습니다");
      window.location.replace("/");
    }
  } catch (error: any) {
    alert(error.response.data.msg);
  }
};

//로그아웃
export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  alert("로그아웃 되었습니다.");
  window.location.href = "/"; //redirect, navigate으로 하면 새로고침이 안됨
};

//내 정보 가져오기
export const getMyData = async (token: string) => {
  try {
    const res = await axios({
      url: `${baseUrl}/member/info`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      let user = await res.data;
      user = {
        ...user,
        img:
          user.gender === "MALE"
            ? "https://i.pinimg.com/564x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg"
            : "https://i.pinimg.com/236x/11/27/98/11279881d6995a0aef4915b3906aae3f.jpg",
        isAdmin: user.role === "ROLE_ADMIN" ? true : false,
      };
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

// 유저 아이디로 정보 불러오기
export function useGetUserDataById(userId?: string) {
  const [user, setUser] = useState<IGetUser>();

  useEffect(() => {
    axios
      .get(`${baseUrl}/member/info/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          let user = res.data;
          user = {
            ...user,
            img:
              user.gender === "MALE"
                ? "https://i.pinimg.com/564x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg"
                : "https://i.pinimg.com/236x/11/27/98/11279881d6995a0aef4915b3906aae3f.jpg",
          };
          setUser(user);
        }
      })
      .catch((error) => console.log(error));
  }, [userId]);

  return user;
}

//카카오 로그인
export const kakaoSignin = async (access_token: string) => {
  try {
    const res = await axios({
      url: `${baseUrl}/oauth/kakao/${access_token}`,
      method: "get",
    });

    if (res.status === 200) {
      console.dir(res.data.isFirstSignIn);
      const token = res.data.token;

      localStorage.setItem("token", token);
      // 만료시간 30분
      const expiration = new Date(new Date().getTime() + 30 * 60 * 1000);
      localStorage.setItem("expiration", expiration.toISOString());
      console.log(res);
      alert("로그인 되셨습니다");
      if (res.data.isFirstSignIn === true) {
        window.location.replace("/profile/update");
      } else if (res.data.isFirstSignIn === false) {
        window.location.replace("/");
      }
    }
  } catch (error: any) {
    alert(error.response.data.msg);
  }
};

//프로필 업데이트
export const updateProfile = async (userData: any, token: string) => {
  try {
    const res = await axios({
      url: `${baseUrl}/oauth/member/modify-member-info`,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: userData,
    });
    if (res.status === 200) {
      alert("수정 완료되었습니다.");
      window.location.replace("/view/me");
    }
  } catch (error) {
    console.log(error);
    alert("수정 실패했습니다.");
  }
};
