import React, { useContext, useEffect, useState } from "react";
import "./item.scss";
import { deleteBougthProduct } from "../../uttils";
import { Context } from "../../context/context";
import { useCookies } from "react-cookie";
import axios from "axios";

const Item = ({ data, setCostHandler, costHandler, id, max_num }) => {
  const { state, dispatch } = useContext(Context)
  const [count, setCount] = useState(max_num)
  const [cost, setCost] = useState(data.cost)


  async function increment() {
    setCount(count + 1)
    const newCost = data.cost * count
    setCost(data.cost + newCost)
    axios.patch(`http://localhost:8000/api/buy/${id}/`, { max_num: parseInt(count + 1) }).then(res => console.log(res.data))
    setCostHandler(costHandler + data.cost)
  }

  useEffect(() => {
    const cost1 = count * data.cost
    setCost(cost1)
    setCostHandler(costHandler + data.cost)
  }, [])

  const decrement = (id2) => {
    if (count <= 1) {
      dispatch({ type: 'findByIdAndRemove', payload: id2 })
      deleteBougthProduct(id2)
        .then((res) => {
          console.log(res);
        })
      setCostHandler(costHandler - data.cost)
      return
    }
    setCount(count - 1)
    setCost(cost - data.cost)
    setCostHandler(costHandler - data.cost)
  }


  return (
    <div className="item">
      <div className="img">
        <img src={data.image} alt={data.title} />
      </div>
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
