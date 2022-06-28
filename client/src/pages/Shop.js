import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Navbar from '../components/Navbar';
import { getAll, getAllForShop, getShops } from '../http/itemsAPI';
import '../styles/shop.css';
import { Context } from '..';

const Shop = observer(() => {
  const [items, setItems] = useState([]);
  const [shops, setShops] = useState([]);
  const { cart } = useContext(Context);

  async function render() {
    await getAll().then((data) => {
      setItems(data);
    });
    await getShops().then((data) => {
      setShops(data);
    });
  }

  async function getForShop(shop) {
    await getAllForShop(shop).then((data) => {
      setItems(data);
    });
  }

  useEffect(() => {
    render();
  }, []);

  function addItem(item) {
    let cartItem = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        cartItem = true;
      }
    }
    if (!cartItem) {
      cart.push(item);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mainShop">
        <div className="shops">
          <div className="shopName">
            <span onClick={render}>ALL</span>
          </div>
          {
                    shops.map((shop) => (
                      <div className="shopName">
                        <span onClick={() => { getForShop(shop.shop); }}>{shop.shop}</span>
                      </div>
                    ))
                }
        </div>
        <div className="items">
          {
                    items.map((item) => (
                      <div className="item">
                        <img src={require(`../img/${item.img}`)} />
                        <span>{item.name}</span>
                        <div className="priceBlock">
                          <span>
                            {item.price}
                            $
                          </span>
                          <button onClick={() => { item.amount = 1; addItem(item); }}>Add to Cart</button>
                        </div>
                      </div>
                    ))
                }
        </div>
      </div>
    </div>
  );
});

export default Shop;
