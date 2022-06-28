import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Navbar from '../components/Navbar';
import '../styles/cart.css';
import { Context } from '..';
import { createOrder } from '../http/ordersAPI';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Cart = observer(() => {
  const navigate = useNavigate();

  const { cart, setCart } = useContext(Context);
  const [price, setPrice] = useState();
  const {
    register, formState: { errors }, handleSubmit, reset,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    totalPrice();
  }, []);

  function totalPrice() {
    let sum = 0;
    cart.map((item) => {
      sum += item.price * item.amount;
    });
    setPrice(sum);
  }

  async function makeOrder(data) {
    if (cart.length !== 0) {
      await createOrder(data.name, data.email, data.phone, data.address, cart, price);
      setCart([]);
      reset();
      navigate('/');
    }
  }

  function deleteItem(item) {
    cart.splice(cart.indexOf(item), 1);
    navigate('/cart');
  }

  return (
    <div>
      <Navbar />
      <div className="mainCart">
        <div className="about">
          <span>Name</span>
          <input {...register('name', { required: true, pattern: /[A-Za-z]{3,}/ })} />
          <p className="pError">{errors.name?.type === 'required' ? 'Is not empty' : errors.name?.type === 'pattern' ? 'Not valid' : null}</p>
          <span>Email</span>
          <input {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
          <p className="pError">{errors.email?.type === 'required' ? 'Is not empty' : errors.email?.type === 'pattern' ? 'Not valid' : null}</p>
          <span>Phone</span>
          <input {...register('phone', { required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ })} />
          <p className="pError">{errors.phone?.type === 'required' ? 'Is not empty' : errors.phone?.type === 'pattern' ? 'Not valid' : null}</p>
          <span>Address</span>
          <input {...register('address', { required: true })} />
          <p className="pError">{errors.address?.type === 'required' ? 'Is not empty' : errors.address?.type === 'pattern' ? 'Not valid' : null}</p>
        </div>
        <div className="cart">
          {
                        cart.map((item) => (
                          <div className="cartItem">
                            <img src={require(`../img/${item.img}`)} />
                            <div className="orderBlock">
                              <span>{item.name}</span>
                              <span>
                                Price:
                                {item.price}
                                $
                              </span>
                              <input value={item.amount} onChange={(e) => { item.amount = e.target.value; totalPrice(); }} min={0} type="number" />
                              <button onClick={() => { deleteItem(item); }}>Delete</button>
                            </div>
                          </div>
                        ))
                    }
        </div>
      </div>
      <div className="orderButton">
        <span>
          Total price:
          {price}
          $
        </span>
        <button onClick={handleSubmit(makeOrder)}>Submit</button>
      </div>
    </div>
  );
});

export default Cart;
