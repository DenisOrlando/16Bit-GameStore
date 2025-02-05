import React, { useState, useEffect } from "react";
import { ProductInCart } from "../../../interfaces";
import PurchaseStep2 from "../../../assets/img/svg/purchase-steps-2.svg";
import { StyledSVG, Btn } from "../../../GlobalStyles/GlobalStyles";
import axios from "axios";

const Order = () => {
  const user = JSON.parse(localStorage.getItem("userData")!);
  const cart: any = JSON.parse(localStorage.getItem("cart")!);
  const [subtotal, setSubtotal] = useState(0.0);
  const [inputAddress, setinputAddress] = useState({
    address: user.data.address,
  });
  const [error, setError] = useState({ address: "" });

  useEffect(() => {
    if (cart) {
      setSubtotal(
        cart.reduce((acc: number, product: ProductInCart) => {
          acc = acc + product.price_product! * product.quantity!;
          return acc;
        }, 0.0)
      );
    }
  }, [cart]);

  const order = {
    id_user: user?.id,
    status_order: "pending",
    amount_order: subtotal,
    cart: cart?.map((c: ProductInCart) => ({
      id_product: c.id_product,
      price_product: c.price_product,
      quantity: c.quantity,
    })),
    address_order: inputAddress.address,
  };


  const validate = (address: any) => {
    let errors = {
      address: "",
    };
    if (address.address.length === 0) {
      errors.address = "la direccion tiene que ser real";
    }
    return errors;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handlePayment();
  }

  async function handlePayment() {

    try {
      const preference:any = await( 
         await fetch("https://videogame-store-16bit.herokuapp.com/order", {
          method: "post",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        })).json();  

      /*   await axios({
        method: 'post',
        url: 'https://videogame-store-16bit.herokuapp.com/order',
        data: order
    }));  

    /* await axios.post( '/order', order, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ) *//* ) */;
/*     const res = await axios.post('https://httpbin.org/post', { hello: 'world' }, {
  headers: {
    // 'application/json' is the modern content-type for JSON, but some
    // older servers may use 'text/json'.
    // See: http://bit.ly/text-json
    'content-type': 'text/json'
  }
}); */
 
  
  /*   await axios.post("/order", JSON.stringify(order))); */

      var script = document.createElement("script");

      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preference.preferenceId;

      script.setAttribute("data-button-label", "Pagar con Mercado Pago");

      const element: HTMLElement = document.getElementById(
        "mercado"
      ) as HTMLElement;
      element.innerHTML = "";

      const elementTwo: HTMLElement = document.querySelector<HTMLDivElement>(
        "#mercado"
      ) as HTMLElement;

      elementTwo.appendChild(script);
    } catch {
      alert("Sin stock");
    }
  }

  const handleAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
    setinputAddress({
      ...inputAddress,
      address: e.currentTarget.value,
    });

    setError(
      validate({
        ...inputAddress,
        address: e.currentTarget.value,
      })
    );
  };

  return (
    <>
      <h2>Your adress:</h2>
      <StyledSVG src={PurchaseStep2} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h2>Please confirm your address</h2>
          <input
            name="address"
            value={inputAddress.address}
            onChange={(e) => handleAddressChange(e)}
          />
          <Btn type="submit">Confirmar 👾</Btn>
        </label>
      </form>
      {error.address && <div>{error.address}</div>}
      {inputAddress && <div id="mercado" className="mercado"></div>}
    </>
  );
};

export default Order;
