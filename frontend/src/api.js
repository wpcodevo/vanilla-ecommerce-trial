/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { apiURL } from './config';

export const getProduct = async (id) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${apiURL}api/products/${id}`,
    });

    if (!response || response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    const { product } = response.data;
    return product;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};
