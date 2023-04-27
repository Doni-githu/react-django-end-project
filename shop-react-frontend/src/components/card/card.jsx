import "./card.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { Context } from "../../context/context";

const Card = ({ title, image, cost, i }) => {
  const [id, setId] = useCookies(["id"]);
  const [token] = useCookies(['mytoken'])
  const [user] = useCookies(['user'])
  const { state, dispatch } = useContext(Context)
  const getID = (id) => {
    dispatch({ type: 'findById', payload: id })
    console.log(id);
    axios.post('http://localhost:8000/api/buy/', {
      user: parseInt(user.user), product: id, max_num: 1,
    }, {
      headers: {
        Authorization: `Token ${token.mytoken}`,
      }
    }).then((res) => console.log(res.data))
      .catch((error) => console.log(error.response))
  }

  return (
    <div className="card_home">
      <img src={image} alt="" />
      <div className="texts">
        <p>{title}</p>
        <p>{cost}$</p>
      </div>
      <div className="btns">
        <Link to={"detail"} onClick={() => setId("id", i)}>
          <button>Detail</button>
        </Link>
        <button onClick={() => getID(i)}>Buy</button>
      </div>
    </div>
  );
};

export default Card;
