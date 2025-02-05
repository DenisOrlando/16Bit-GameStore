import React, { FC } from "react";
import { StyledNavBar } from "./StyledNavBar";
import { Link, useHistory } from "react-router-dom";
import { SearchBar } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/products_action";
import { Dropdown, StyledSVG } from "../../GlobalStyles/GlobalStyles";
import { Title } from "../index";
import { Store } from "../../redux/reducer";
import { ProductInCart } from "../../interfaces";
import { LogOut } from "../index";
import { openLogin } from "../../redux/actions/global_actions";
//Logos
import cart from "../../assets/img/svg/cart2.svg";
import userPic from "../../assets/img/svg/user.svg";

import "nes.css/css/nes.min.css";

interface Props {
  setPage(num: number): void;
  toggleModal: any;
}

const NavBar: FC<Props> = ({ setPage, toggleModal }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const homeOnClick = () => {
    dispatch(getAllProducts());
  };

  const openLoginModal = () => {
    history.push("/login");
    dispatch(openLogin(true));
  };

  const cartNumber: any = useSelector(
    (state: Store) => state.cartReducer.cart.list
  );

  const number = cartNumber?.reduce((acc: number, prod: ProductInCart) => {
    acc = acc + prod.quantity!;
    return acc;
  }, 0);

  const user = JSON.parse(localStorage.getItem("userData")!);

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
            <Dropdown>
              <StyledSVG src={userPic} />
              <span>User</span>
              {!user ? (
                <ul>
                  <li>
                    <button
                      className="dropdown__button"
                      onClick={openLoginModal}
                    >
                      Log In
                    </button>
                  </li>
                  <li>
                    <Link to="/signup" className="dropdown__button">
                      Signup
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/me" className="dropdown__button">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown__button">
                      <LogOut />
                    </div>
                  </li>
                </ul>
              )}
            </Dropdown>

            <li>
              <button onClick={toggleModal}>
                <StyledSVG src={cart} />
                <span>Cart</span>
                {!!number && (
                  <span className="cart__number">
                    {number >= 100 ? "99+" : number}
                  </span>
                )}
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
