<script>
        // JavaScript to filter products based on search input
        function filterProducts() {
            var searchInput = document.getElementById('main-search').value.toLowerCase();
            var products = document.querySelectorAll('.product');

            products.forEach(function(product) {
                var productName = product.querySelector('.product-m__name a').innerText.toLowerCase();
                if (productName.includes(searchInput)) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    </script>