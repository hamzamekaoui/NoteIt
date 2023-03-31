import "./styles.scss";

type Props = {
  addNoteHandler: Function;
  deleteNoteHandler: Function;
};

const Actions = ({ addNoteHandler, deleteNoteHandler }: Props) => {
  const onClickAdd = () => {
    addNoteHandler();
  };

  const onClickDelete = () => {
    deleteNoteHandler();
  };

  return (
    <>
      <button className="button" onClick={onClickAdd}>
        Add
      </button>
      <button className="button" onClick={onClickDelete}>
        Delete
      </button>
    </>
  );
};

export default Actions;
