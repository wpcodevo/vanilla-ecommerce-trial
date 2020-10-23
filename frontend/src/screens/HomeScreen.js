/* eslint-disable no-undef */
import axios from 'axios';
import Rating from '../components/Rating';

const fetchProducts = async () => {
  try {
    const response = await axios({
      url: 'http://127.0.0.1:3000/api/products',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response || response.statusText !== 'OK') {
      return `<div>Error fetching data</div>`;
    }

    const { products } = response.data;

    return products;
  } catch (error) {
    console.log(error);
  }
};

const HomeScreen = {
  render: async () => {
    const products = await fetchProducts();
    return `
    <section class="product-center">
    ${products
      .map(
        ({
          title,
          image,
          price,
          _id,
          rating,
          numReviews,
        }) => `<div class="product">
        <div class="product__header">
          <img src="${image}" class="small" alt="product" />
        </div>
        <div class="product__footer">
          <h3>${title}</h3>
          ${Rating.render({ value: rating, text: `${numReviews} reviews` })}
          <div class="product__price">
            <h4>$${price}</h4>
          </div>
        </div>
        <ul>
          <li>
            <a href="/#/products/${_id}">
              <i class="far fa-eye"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="far fa-heart"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fas fa-sync"></i>
            </a>
          </li>
        </ul>
      </div>`
      )
      .join('')}
    </section>
    `;
  },
};

export default HomeScreen;
