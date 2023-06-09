import { useState, useEffect } from "react";
import { findPwd } from "../api/auth";
import { FormContainer, Button } from "../styles/Form";
import FormInput from "../components/sign/FormInput";
import { useAuth } from "../hooks/useAuth";
import { toggleAuth } from "../store/auth";

export default function FindPwd() {
  const [authEmail, dispatch] = useAuth();
  useEffect(() => {
    dispatch(toggleAuth(false));
  }, [dispatch]);

  // console.log(authEmail);
  type ObjType = {
    [index: string]: any;
    id: string;
    email: string;
    password: string;
  };

  const [values, setValues] = useState<ObjType>({
    id: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findPwd({ id: values.id, password: values.password });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 1,
      name: "id",
      type: "text",
      placeholder: "아이디",
      errorMessage:
        "숫자, 영문소문자, 언더바/하이픈 조합으로 4자 이상 입력해주세요",
      label: "아이디",
      pattern: "^[a-z0-9]{4,20}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "이메일",
      errorMessage: "올바른 이메일 형식이 아니에요",
      label: "이메일",
      pattern: "^[a-z0-9]+@[a-z]+.[a-z]{2,3}$",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "비밀번호",
      errorMessage: "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요",
      label: "비밀번호",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*~])[a-zA-Z0-9!@#$%^&*~]{8,20}$",
      required: true,
    },
  ];

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h1>비밀번호 찾기</h1>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          );
        })}
        <Button disabled={!authEmail} className="submit">
          변경하기
        </Button>
      </form>
    </FormContainer>
  );
}
