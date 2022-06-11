import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Loading() {
  return (
    <LoadingContainer>
      <FontAwesomeIcon icon={faSpinner} size="8x" />
      <div>데이터 로딩중...</div>
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  padding-bottom: 100px;
  justify-content: center;
  align-items: center;

  svg {
    animation-duration: 2s;
    animation-name: rotate;
    animation-iteration-count: infinite;
    margin-bottom: 20px;
  }

  div {
    font-size: large;
    font-weight: bold;
  }
`;
