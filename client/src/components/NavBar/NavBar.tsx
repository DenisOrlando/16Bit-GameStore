import React from "react";
import { StyledNavBar } from "./StyledNavBar";
import { Link } from "react-router-dom";
import { SearchBar } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/products_action";
import { StyledSVG, Dropdown } from "../../GlobalStyles/GlobalStyles";
import { Title } from "../index";
import { Store } from "../../redux/reducer";
import { ProductInCart } from "../../interfaces";

//Logos
import cart from "../../assets/img/svg/cart2.svg";
import moon from "../../assets/img/svg/moon.svg";
import userPic from "../../assets/img/svg/user.svg";

import "nes.css/css/nes.min.css";

const NavBar = ({ setPage }: any) => {
  const dispatch = useDispatch();

  const homeOnClick = () => {
    dispatch(getAllProducts());
  };

  const cartNumber: any = useSelector(
    (state: Store) => state.cartReducer.cart.list
  );

  const number = cartNumber.reduce((acc: number, prod: ProductInCart) => {
    acc = acc + prod.quantity;
    return acc;
  }, 0);

  return (
    <StyledNavBar>
      <div className="wrapper">
        <div className="navbar__top">
          <div className="navbar__logo">
            <Link to="/home" onClick={homeOnClick}>
              <Title />
            </Link>
          </div>
          <SearchBar setPage={setPage} />
          <ul className="navbar__options">
            <li>
              <Link to="/user">
                <StyledSVG src={userPic} />
                <span>User</span>
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <StyledSVG src={cart} />
                <span>Cart</span>
                {!!number && (
                  <span className="cart__number">
                    {number >= 100 ? "99+" : number}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button>
                <StyledSVG src={moon} />
                <span>Theme</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar__bottom">
          <ul className="navbar-bottom__menu">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
