// Import React Fuctionnality
import React from "react";

//  Import PrimeReact components
import { InputTextarea } from "primereact/inputtextarea";

const commentInput = (props) => {
  const { commentText, setCommentText, disabled = false } = props;
  return (
    <InputTextarea
      autoResize
      value={commentText}
      placeholder="Комментарий"
      onChange={(e) => setCommentText(e.target.value)}
      rows={5}
      cols={30}
      disabled={disabled}
    />
  );
};

export default commentInput;
