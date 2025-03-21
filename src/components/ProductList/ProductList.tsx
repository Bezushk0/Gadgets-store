import React from 'react';
import style from './ProductList.module.scss';
import { ProductType } from '../../types/ProductType';
import { useStateContext } from '../../state/state';
import { Loader } from '../Loader/Loader';
import { Card } from '../Card/Card';
import { Pages } from '../../enums/Pages';

interface Props {
  products?: ProductType[];
  sort?: (a: ProductType, b: ProductType) => number;
}

export const ProductList: React.FC<Props> = ({ products, sort }) => {
  const { state } = useStateContext();

  if (state.loading) {
    return <Loader />;
  }

  let productsRender = products;

  if (sort) {
    productsRender = state.products.sort(sort);
  }

  return (
    <ul className={style.product_list}>
      {productsRender?.map(product => (
        <Card key={product.id} product={product} page={Pages.ProductsPage} />
      ))}
    </ul>
  );
};
