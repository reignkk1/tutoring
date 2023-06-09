import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import Button from "../components/common/Button";
import Parser from "html-react-parser";
import { AuthContext } from "../context/AuthContext";
// import useIsAdmin from "../hooks/useIsAdmin";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { deletePost } from "../store/post/postApiAction";

const Container = styled.div`
  padding: 4rem;
  transition: all 0.3s ease-out;

  @media (max-width: 650px) {
    padding-inline: 2rem;
  }
`;
const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-family: regular;
`;
const Content = styled.div`
  line-height: 1.8;
`;
const ButtonContainer = styled.div`
  button {
    margin-right: 10px;
  }
`;

interface INoticePost {
  id: string;
  title: string;
  content: string;
}

export default function NoticeDetail() {
  const dispatch = useDispatch<ThunkDispatch<any, void, any>>();
  const post: INoticePost = useLocation().state;
  const navigate = useNavigate();

  // const isAdmin = useIsAdmin();
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      dispatch(deletePost({ category: "notice", id: post.id }));
      window.location.assign("/notice");
    }
    return;
  };

  const handleModify = () => navigate("edit", { state: post });
  return (
    <Wrapper>
      <Container>
        <Title>{post.title}</Title>
        <Content>{Parser(post.content)}</Content>
        {user && user.isAdmin && (
          <ButtonContainer>
            <Button onClick={handleDelete}>삭제</Button>
            <Button onClick={handleModify}>수정</Button>
          </ButtonContainer>
        )}
      </Container>
    </Wrapper>
  );
}
