import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import Item from "../item/item";
import "./savatcha.scss";
import { Context } from "../../context/context";
import { getAll } from "../../uttils/index"
import axios from "axios";
import { useCookies } from "react-cookie";
const Savatcha = ({ setModal }) => {
  const { state, dispatch } = useContext(Context)
  const stat = () => {
    return state.basket.map((item) => {
      return item.cost
    })
  }
  const start = stat().reduce((pre, are) => pre + are, 0)
  const [costHandler, setCostHandler] = useState(start)
  const [token] = useCookies(['mytoken'])
  const [user] = useCookies(['user'])

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/buy', { headers: { Authorization: token.mytoken ? `Token ${token.mytoken}` : '9aef89d2ba185e28d5a4053145168beaee1b42ef', } })
  //     .then((res) => {
  //       dispatch({ type: 'find', payload: res.data })
  //       for (let i = 0; i < state.data.length; i++) {
  //         const element = state.basket[i];
  //         if(element.user === parseInt(user.user)){
  //           console.log(element);
  //         }
  //       }
  //     }).catch((err) => {
  //       console.log(err.response)
  //     })
  // }, [])

  return (
    <div className="bg">
      <div className="savatcha">
        <div className="header">
          <h1>Xaridlaringiz</h1>
          <button onClick={() => setModal(false)}>
            <AiOutlineArrowRight />
          </button>
        </div>
        <div className="items">
          {state?.basket.map((mal) => (
            <Item key={mal.id} id={mal.id} data={mal} setCostHandler={setCostHandler} costHandler={costHandler} />
          ))}
        </div>
        <div className="footer">
          <p className="max_product">Jami {state.basket.length} mahsulot</p>
          <p>{costHandler} so'm</p>
        </div>
      </div>
    </div>
  );
};

export default Savatcha;
