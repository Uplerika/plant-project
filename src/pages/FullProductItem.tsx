import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/types";
import { db } from "../utils/firebase";

const FullProductItem: React.FC = () => {
  const [fullPlant, setfullPlant] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantIdRef = doc(db, "products", id as string);
        const docData = await getDoc(plantIdRef);
        if (docData.exists()) {
          const data = docData.data();
          setfullPlant(data as IProduct);
        } else {
          navigate("/404");
        }
      } catch (error) {
        //console.log("ERROR", error);
      }
    };
    fetchPlants();
  }, [navigate, id]);

  if (!fullPlant) {
    return (
      <div className="cart cart--empty">
        <h2>
          Подождите. <br></br> Идет загрузка...<i>⏳</i>
        </h2>
      </div>
    );
  }
  return (
    <div className="container container__full">
      <img className="img" src={fullPlant?.imageUrl} alt={fullPlant?.title} />
      <h1 className="title">{fullPlant?.title}</h1>
      <div className="price">
        <span>Цена:</span>
        <h4>{fullPlant?.price} ₽</h4>
        <br />
        <p>Описание</p>
      </div>
      <Link className="button-back" to={-1 as any}>
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullProductItem;
