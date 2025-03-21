import React from 'react';
import style from './ProductPhotos.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import classNames from 'classnames';

interface Props {
  onImageSelect: (image: string) => void;
  productDetails: ProductDetailsType;
  selectedImage: string | null;
}

export const ProductPhotos: React.FC<Props> = ({
  onImageSelect,
  productDetails,
  selectedImage,
}) => {
  return (
    <div className={style.product_details__photos}>
      <div className={style.product_details__photos_preview}>
        <ul className={style.product_details__photos_preview_list}>
          {productDetails.images.map(image => (
            <li
              key={image}
              className={classNames(
                style.product_details__photos_preview_item,
                { [style.selected]: selectedImage === image },
              )}
              onClick={() => onImageSelect(image)}
            >
              <img src={image} alt={productDetails.name} />
            </li>
          ))}
        </ul>
      </div>

      <div className={style.product_details__photos_main}>
        <img
          src={selectedImage || productDetails.images[0]}
          alt={productDetails.name}
        />
      </div>
    </div>
  );
};
