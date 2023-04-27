import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import Item from "../item/item";
import "./savatcha.scss";
import { Context } from "../../context/context";
import { getBoughtProduct } from "../../uttils/index"
import { useCookies } from "react-cookie";


const Savatcha = ({ setModal }) => {
  const { state, dispatch } = useContext(Context)
  const pro = state.basket.map((item) => {
    return item?.product
  })
  const start = () => {
    return pro.map((item) => {
      return item.cost
    })
  }
  const stat = start().reduce((pre, c) => pre + c, 0)
  const [costHandler, setCostHandler] = useState(stat)
  const [load, setLoad] = useState(false)
  const [user] = useCookies(['user'])



  useEffect(() => {
    setLoad(true)
    dispatch({ type: 'startGet' })
    setCostHandler(0)
    getBoughtProduct()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          if (element.user.id === parseInt(user.user)) {
            dispatch({ type: 'find', payload: element })
          }
        }
      })
      .finally(() => {
        setLoad(false)
      })
  }, [])



  return (
    <div className="bg">
      <div className="savatcha">
        <div className="header">
          <h1>Xaridlaringiz</h1>
          <button onClick={() => setModal(false)}>
            <AiOutlineArrowRight />
          </button>
        </div>
        {!load ? <div className="items">
          {state?.basket?.map((mal) => (
            <Item key={mal.id} id={mal.id} data={mal.product} max_num={mal.max_num} setCostHandler={setCostHandler} costHandler={costHandler} />
          ))}
        </div> : <center>
          <p color="#2ec4b6">Loading...</p>
        </center>}
        <div className="footer">
          <p className="max_product">Jami {state.basket.length} mahsulot</p>
          <p>{costHandler} so'm</p>
        </div>
      </div>
    </div>
  )

}


export default Savatcha;
