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
        cartTotal.innerHTML = 'Tổng cộng: 0đ';
        return;
    }


    // Xóa nội dung cũ
    cartTable.innerHTML = '';


    // Lặp qua từng sản phẩm trong giỏ hàng và hiển thị thông tin
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;


        const row = document.createElement('tr');
        row.style.border = '1px solid #644535;';


        row.innerHTML = `
            <td>
                <div class="table-p__box">
                    <div class="table-p__img-wrap">
                        <img class="u-img-fluid" src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="table-p__info">
                        <span class="table-p__name">
                            <a href="product-detail.html">${item.name}</a>
                        </span>
                        <span class="table-p__category">${item.category}</span>
                        <ul class="table-p__variant-list">
                            <li><span>${item.size}</span></li>
                        </ul>
                    </div>
                </div>
            </td>
            <td>
                <span class="table-p__price" style="font-size: 20px;">${item.price.toLocaleString()}đ</span>
            </td>
            <td>
                <div class="table-p__input-counter-wrap">
                    <div class="input-counter">
                        <span class="input-counter__minus fas fa-minus" style="color: green;" onclick="updateQuantity(${index}, -1)"></span>
                        <input class="input-counter__text input-counter--text-primary-style" type="text" value="${item.quantity}" data-min="1" data-max="1000" style="padding: 5px; margin: 0 5px;" readonly>
                        <span class="input-counter__plus fas fa-plus" style="color: green;" onclick="updateQuantity(${index}, 1)"></span>
                    </div>
                </div>
            </td>
            <td>
                <div class="table-p__del-wrap" style="text-align: center;">
                    <a class="far fa-trash-alt table-p__delete-link" href="javascript:void(0);" onclick="removeItem(${index})"></a>
                </div>
            </td>
        `;
        cartTable.appendChild(row);
    });


    // Cập nhật tổng giá trị giỏ hàng
    cartTotal.innerHTML = `Tổng cộng: ${total.toLocaleString()}đ`;
}


// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
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


// Khởi tạo và render giỏ hàng khi trang load
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});



