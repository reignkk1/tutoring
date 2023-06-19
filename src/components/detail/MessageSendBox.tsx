import styled from "styled-components";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useState } from "react";
import { sendNotePost } from "../../api/note";

const Container = styled.div`
  width: 300px;
  height: 500px;

  color: #ffffff;
  background-color: #1760fa;

  overflow: hidden;
  clip-path: polygon(
    23px 0,
    calc(100% - 23px) 0,
    100% 0,
    100% calc(100% - 23px),
    calc(100% - 23px) 100%,
    23px 100%,
    0 100%,
    0 23px
  );
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 2rem 1.5rem;

  font-family: light;

  input {
    background-color: transparent;
    padding: 0.5rem 0.8rem;
    border: 1px solid #c9fd35;
    outline: none;
    font-family: light;
    line-height: 1.7;
    color: #ffffff;

    &::placeholder {
      font-family: light;
      color: #ffffff;
    }

    border-radius: 5px;
  }
  textarea {
    height: 200px;
    padding: 10px;
    border: 1px solid #c9fd35;
    background-color: transparent;
    outline: none;
    resize: none;

    border-radius: 5px;
    font-family: light;
    line-height: 1.5;
    color: #ffffff;
  }

  div {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 10px;
    }
  }
`;

const Sender = styled.div`
  text-align: start;
  div {
    margin-bottom: 5px;
  }
`;

interface IPost {
  id: string;
  title: string;
  content: string;
  onOrOff: string;
  area: string;
  member: { nickname: string; id: string };
  subject: string;
}

export default function MessageSendBox({
  post,
  setModal,
}: {
  post: IPost;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    user: { nickname: sender, id: senderId },
  } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { nickname: recipient, id: recipientId } = post.member;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      content: content.replaceAll("\n", "<br/>"),
      receiverId: recipientId,
      receiverNickname: recipient,
      senderId: senderId,
      senderNickname: sender,
    };

    sendNotePost(token, data, setModal);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Sender>
          <div>보내는 사람 : {sender}</div>
          <div>받는 사람 : {recipient}</div>
        </Sender>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={title}
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button>전송</button>
      </Form>
    </Container>
  );
}
