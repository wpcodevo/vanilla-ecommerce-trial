import { getProduct } from '../api';
import Rating from '../components/Rating';
import { parseRequestUrl } from '../utils';

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    const {
      title,
      image,
      rating,
      numReviews,
      price,
      countInStock,
      description,
    } = product;
    if (product.error) {
      return `<div>${product.error}</div>`;
    }

    return `<div class="details-center container">
    <div class="go-back">
    <a href="/#/">Go Back</a>
    </div>

    <div class="details">
    <div class="product-image">
    <img src="${image}" alt=""/>
    </div>
    <div class="product-info">
    <ul>
    <li>
    <h1>${title}</h1>
    </li>

    <li>
    ${Rating.render({ value: rating, text: `${numReviews} Reviews` })}
    </li>

    <li>
    Price: <strong> $${price}</strong>
    </li>

    <li>
    Description: 
    <div>
    ${description}
    </div>
    </li>
    </ul>
    </div>
    <div class="product-actions">
    <ul>
    <li>
    Price: $${price}
    </li>
    <li>
    ${
      countInStock > 0
        ? `<span class="success">In Stock</span>`
        : `<span class="warning">Unavailable</span>`
    }
    </li>
    <li>
    <button id="add-to-cart" class="primary-btn">Add To Cart</button>
    </li>
    </ul>
    </div>
    </div>
    </div>`;
  },
};

export default ProductScreen;
