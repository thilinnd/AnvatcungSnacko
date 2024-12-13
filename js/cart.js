// Giỏ hàng ban đầu (nếu chưa có trong localStorage, khởi tạo giỏ hàng trống)
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// Hàm để cập nhật giỏ hàng trong localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Hàm để render giỏ hàng vào trang (cart.html)
function renderCartPage() {
    const cartTable = document.getElementById('cart-table');
    const cartTotal = document.getElementById('cart-total');


    // Nếu giỏ hàng trống, hiển thị thông báo
    if (cart.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="5">Giỏ hàng trống.</td></tr>';
        cartTotal.textContent = 'Tổng cộng: 0đ';
        return;
    }


    // Xóa nội dung cũ
    cartTable.innerHTML = '';


    // Lặp qua từng sản phẩm trong giỏ hàng và hiển thị thông tin
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;


        const row = document.createElement('tr');
        row.style.border = '1px solid #644535';


        // Tạo các ô trong hàng
        const productCell = document.createElement('td');
        const productBox = document.createElement('div');
        productBox.className = 'table-p__box';


        const productImgWrap = document.createElement('div');
        productImgWrap.className = 'table-p__img-wrap';


        const productImg = document.createElement('img');
        productImg.className = 'u-img-fluid';
        productImg.src = item.image;
        productImg.alt = item.name;
        productImgWrap.appendChild(productImg);


        const productInfo = document.createElement('div');
        productInfo.className = 'table-p__info';


        const productName = document.createElement('span');
        productName.className = 'table-p__name';
        const productLink = document.createElement('a');
        productLink.href = 'product-detail.html';
        productLink.textContent = item.name;
        productName.appendChild(productLink);


        const productCategory = document.createElement('span');
        productCategory.className = 'table-p__category';
        productCategory.textContent = item.category;


        const productVariantList = document.createElement('ul');
        productVariantList.className = 'table-p__variant-list';
        const productVariant = document.createElement('li');
        productVariant.textContent = item.size;
        productVariantList.appendChild(productVariant);


        productInfo.appendChild(productName);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productVariantList);


        productBox.appendChild(productImgWrap);
        productBox.appendChild(productInfo);
        productCell.appendChild(productBox);


        const priceCell = document.createElement('td');
        const priceSpan = document.createElement('span');
        priceSpan.className = 'table-p__price';
        priceSpan.style.fontSize = '20px';
        priceSpan.textContent = `${item.price.toLocaleString()}đ`;
        priceCell.appendChild(priceSpan);


        const quantityCell = document.createElement('td');
        const inputCounterWrap = document.createElement('div');
        inputCounterWrap.className = 'table-p__input-counter-wrap';


        const inputCounter = document.createElement('div');
        inputCounter.className = 'input-counter';


        const minusButton = document.createElement('span');
        minusButton.className = 'input-counter__minus fas fa-minus';
        minusButton.style.color = 'green';
        minusButton.onclick = () => updateQuantity(index, -1);


        const quantityInput = document.createElement('input');
        quantityInput.className = 'input-counter__text input-counter--text-primary-style';
        quantityInput.type = 'text';
        quantityInput.value = item.quantity;
        quantityInput.readOnly = true;
        quantityInput.style.padding = '5px';
        quantityInput.style.margin = '0 5px';


        const plusButton = document.createElement('span');
        plusButton.className = 'input-counter__plus fas fa-plus';
        plusButton.style.color = 'green';
        plusButton.onclick = () => updateQuantity(index, 1);


        inputCounter.appendChild(minusButton);
        inputCounter.appendChild(quantityInput);
        inputCounter.appendChild(plusButton);
        inputCounterWrap.appendChild(inputCounter);
        quantityCell.appendChild(inputCounterWrap);


        const deleteCell = document.createElement('td');
        const deleteWrap = document.createElement('div');
        deleteWrap.className = 'table-p__del-wrap';
        deleteWrap.style.textAlign = 'center';


        const deleteLink = document.createElement('a');
        deleteLink.className = 'far fa-trash-alt table-p__delete-link';
        deleteLink.href = 'javascript:void(0);';
        deleteLink.onclick = () => removeItem(index);


        deleteWrap.appendChild(deleteLink);
        deleteCell.appendChild(deleteWrap);


        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(deleteCell);
        cartTable.appendChild(row);
    });


    // Cập nhật tổng giá trị giỏ hàng
    cartTotal.textContent = `Tổng cộng: ${total.toLocaleString()}đ`;
}


// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    if (isNaN(product.quantity) || product.quantity <= 0) {
        product.quantity = 1; // Đảm bảo số lượng ít nhất là 1
    }


    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    updateCart();
    renderCartPage();
}


// Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;


    if (item.quantity <= 0) {
        item.quantity = 1; // Số lượng tối thiểu là 1
    }


    updateCart();
    renderCartPage();
}


// Hàm để xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
    updateCart();
    renderCartPage();
}


// Đồng bộ giỏ hàng giữa các tab
window.addEventListener('storage', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartPage();
});


// Khởi tạo và render giỏ hàng khi trang load
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});
// Hàm để cập nhật giỏ hàng trong localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateMiniCart(); // Gọi hàm updateMiniCart mỗi khi giỏ hàng được cập nhật
}


// Hàm để render mini cart (mini-cart.html)
function updateMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    const miniCartCount = document.getElementById('mini-cart-count');
    const miniCartTotal = document.getElementById('total-cart'); // Cập nhật total-cart


    // Nếu giỏ hàng trống, hiển thị thông báo
    if (cart.length === 0) {
        miniCart.innerHTML = '<div class="mini-cart__empty">Giỏ hàng của bạn trống</div>';
        miniCartCount.textContent = '0';
        miniCartTotal.textContent = '0đ';
        return;
    }


    // Xóa nội dung cũ
    miniCart.innerHTML = '';


    // Lặp qua từng sản phẩm trong giỏ hàng và hiển thị thông tin
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;


        const miniCartItem = document.createElement('div');
        miniCartItem.className = 'card-mini-product';


        const miniProduct = document.createElement('div');
        miniProduct.className = 'mini-product';


        const itemImageWrapper = document.createElement('div');
        itemImageWrapper.className = 'mini-product__image-wrapper';


        const itemLink = document.createElement('a');
        itemLink.className = 'mini-product__link';
        itemLink.href = 'product-detail.html';


        const itemImage = document.createElement('img');
        itemImage.className = 'u-img-fluid';
        itemImage.src = item.image;
        itemImage.alt = item.name;


        itemLink.appendChild(itemImage);
        itemImageWrapper.appendChild(itemLink);


        const itemInfoWrapper = document.createElement('div');
        itemInfoWrapper.className = 'mini-product__info-wrapper';


        const itemName = document.createElement('span');
        itemName.className = 'mini-product__name';
        itemName.textContent = item.name;


        const itemQuantity = document.createElement('span');
        itemQuantity.className = 'mini-product__quantity';
        itemQuantity.textContent = `${item.quantity} x`;


        const itemPrice = document.createElement('span');
        itemPrice.className = 'mini-product__price';
        itemPrice.textContent = `${(item.price * item.quantity).toLocaleString()}đ`;


        itemInfoWrapper.appendChild(itemName);
        itemInfoWrapper.appendChild(itemQuantity);
        itemInfoWrapper.appendChild(itemPrice);


        miniProduct.appendChild(itemImageWrapper);
        miniProduct.appendChild(itemInfoWrapper);


        miniCartItem.appendChild(miniProduct);


        const deleteLink = document.createElement('a');
        deleteLink.className = 'mini-product__delete-link far fa-trash-alt';
        deleteLink.href = 'javascript:void(0);';
        deleteLink.onclick = () => removeItem(cart.indexOf(item));


        miniCartItem.appendChild(deleteLink);
        miniCart.appendChild(miniCartItem);
    });


    // Cập nhật số lượng sản phẩm trong mini cart
    miniCartCount.textContent = cart.length;
    miniCartTotal.textContent = `${total.toLocaleString()}đ`; // Cập nhật tổng tiền giỏ hàng
}





