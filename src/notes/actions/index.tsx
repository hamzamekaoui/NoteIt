import AddIcon from "../../assets/icon-a.svg";
import DeleteIcon from "../../assets/icon-d.svg";
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
    <div className="menu">
      <button className="button" onClick={onClickAdd}>
        <img src={AddIcon} alt="Add" />
      </button>
      <button className="button" onClick={onClickDelete}>
        <img src={DeleteIcon} alt="Delete" />
      </button>
    </div>
  );
};

export default Actions;
