import React, { FC } from "react";
import { Product } from "../../interfaces";
import { ProductCard } from "../index";
import { StyledCatalog } from "./StyledCatalog";
import {MarioLoading } from "../index";

// interface NavBarProps {
//     currentProducts: any;
//   }

interface Props {
  currentProducts: any;
}

const Catalog: FC<Props> = ({ currentProducts }) => {
  return (
    <StyledCatalog id="catalog">
      {currentProducts?.length !== 0 ?
        currentProducts?.map((product: Product) => (
          <ProductCard game={product} key={product.id_product} />
        )):
        <MarioLoading/>
        }
    </StyledCatalog>
  );
};

export default Catalog;
