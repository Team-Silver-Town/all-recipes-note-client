import styled from "styled-components";

const Notes = ({ notes }) => {
  // console.log(notes);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <NotesContainer>
      {notes.map((note) => {
        return (
          note.visibility && (
            <NotesCard key={note._id}>
              <div>{`${note.creator.nickname} 님의 레시피 노트`}</div>
              <div>{`작성일 ${new Date(note.createdAt).toLocaleString(
                "ko-KR",
                options
              )}`}</div>
              <div>
                {`👍 ${note.liked.length}`}
                {`👎 ${note.disliked.length}`}
              </div>
            </NotesCard>
          )
        );
      })}
    </NotesContainer>
  );
};

export default Notes;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const NotesCard = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
`;
