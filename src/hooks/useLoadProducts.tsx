import { useCallback, useEffect } from 'react';
import { useStateContext } from '../state/state';
import { ActionTypes } from '../enums/ActionTypes';
import { getProducts } from '../api/serviceApi';

export const useLoadProducts = () => {
  const { state, dispatch } = useStateContext();

  const loadProducts = useCallback(async () => {
    dispatch({ type: ActionTypes.FETCH_PRODUCTS_REQUEST });

    try {
      const data = await getProducts();

      dispatch({ type: ActionTypes.FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionTypes.FETCH_PRODUCTS_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_PRODUCTS_FAILURE,
          payload: 'An unknown error occurred',
        });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.products.length === 0) {
      loadProducts();
    }
  }, [loadProducts, state.products]);

  return loadProducts;
};
