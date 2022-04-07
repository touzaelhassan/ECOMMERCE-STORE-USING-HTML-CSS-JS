import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import '../css/contact.css';
import '../css/search.css';
import '../css/payment.css';
import '../css/checkout.css';
import '../css/product.css';
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const dataProductQuantities = document.querySelectorAll(
  '[data-product-quantity]'
);

const productPriceElements = document.querySelectorAll(
  '.total-price-for-product'
);

let totalElement = document.querySelector('.total-price');
const deleteButtons = document.querySelectorAll('.delete__product');

function updateProductPriceTotal(productPrice, quantity, index) {
  productPriceElements.forEach((p_item, p_index) => {
    if (p_index + 1 == index) {
      p_item.innerHTML = productPrice * quantity;
    }
  });
}

function updateTotal() {
  let total = 0;
  productPriceElements.forEach((item) => {
    if (item.innerText != '') {
      total += parseInt(item.innerText);
    }
  });
  totalElement.innerText = total;
}

dataProductQuantities.forEach((dataProductQuantity) => {
  dataProductQuantity.addEventListener('change', function (event) {
    let productPrice = parseInt(
      this.parentElement.parentElement.dataset.productPrice
    );
    let quantity = parseInt(event.target.value);
    let index = this.parentElement.parentElement.getAttribute('id');

    updateProductPriceTotal(productPrice, quantity, index);
    updateTotal();
  });
});

function updateAfterDelete(productTotal) {
  let total = parseInt(totalElement.innerText);
  total = total - productTotal;
  totalElement.innerText = total;
}

deleteButtons.forEach((button) => {
  button.addEventListener('click', function () {
    let product = this.parentElement.parentElement;
    let productTotal = parseInt(
      product.querySelector('.total-price-for-product').innerText
    );

    updateAfterDelete(productTotal);

    product.remove();
    product.querySelector('.total-price-for-product').innerText = '';
  });
});
