import axios from "axios"
import React, { useCallback, useContext, useMemo, useState } from "react";
import "./item.scss";
import { Context } from "../../context/context";
import { useCookies } from "react-cookie";

const Item = ({ data, setCostHandler, costHandler, id }) => {
  const [count, setCount] = useState(1)
  const [cost, setCost] = useState(data.cost)
  const [token] = useCookies(['mytoken'])
  const { state, dispatch } = useContext(Context)


  async function increment() {
    setCount(count + 1)
    const newCost = data.cost * count
    setCost(data.cost + newCost)
    setCostHandler(costHandler + data.cost)
  }
  const decrement = (id2) => {
    if (count <= 1) {
      dispatch({ type: 'findByIdAndRemove', payload: id2 })
      setCostHandler(costHandler - data.cost)
      return
    }
    setCount(count - 1)
    setCost(cost - data.cost)
    setCostHandler(costHandler - data.cost)
  }


  return (
    <div className="item">
      <img src={data.image} />
      <div className="texts">
        <p className="title">{data.title}</p>
        <p className="cost">{cost} so'm</p>
      </div>
      <div className="btns">
        <p className="ishora" onClick={() => decrement(id)}>-</p>
        <p className="num">{count}</p>
        <p className="ishora" onClick={() => increment()}>+</p>
      </div>
    </div>
  );
};

export default Item;
