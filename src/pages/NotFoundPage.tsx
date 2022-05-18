import { Link } from "react-router-dom";

const NotFoundPage: React.FC<any> = () => {
  return (
    <div className="notfound">
      <h3>Упс... Похоже вы забрели не туда :)</h3>
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
