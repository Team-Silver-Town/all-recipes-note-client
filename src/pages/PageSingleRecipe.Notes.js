import { dateOptions } from "../config/dateConfig";
import { sortDescendingByCreatedAt } from "../utils/sortHelper";
import styled from "styled-components";

const Notes = ({ loginUserInfo, notes, openNote, changeNote }) => {
  const clickNoteHandler = (event) => {
    changeNote(event.target.id);
    openNote("note");
  };

  return (
    <NotesContainer>
      {notes &&
        sortDescendingByCreatedAt(notes).map((note) => {
          return (
            note.visibility && (
              <NotesCard
                key={note._id}
                id={note._id}
                onClick={clickNoteHandler}
              >
                <NoteCreator>{`${note.creator.nickname} 님의 레시피 노트`}</NoteCreator>
                <NotedCreatedAt>{`작성일 ${new Date(
                  note.createdAt
                ).toLocaleString("ko-KR", dateOptions)}`}</NotedCreatedAt>
                <NotePopularity>
                  {`👍 ${note.liked.length}`}
                  {`👎 ${note.disliked.length}`}
                </NotePopularity>
              </NotesCard>
            )
          );
        })}
    </NotesContainer>
  );
};

export default Notes;

const NoteCreator = styled.div`
  pointer-events: none;
`;

const NotedCreatedAt = styled.div`
  pointer-events: none;
`;

const NotePopularity = styled.div`
  pointer-events: none;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const NotesCard = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  border: none;
`;
