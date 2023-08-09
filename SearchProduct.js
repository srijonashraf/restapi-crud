const SearchProduct = document.querySelector('#SearchProduct');
const inputGroupHide = document.querySelector('#inputGroupHide');
const SearchResetButton = document.querySelector('#SearchResetButton');
const productDetailsTextArea = document.querySelector('#productDetailsTextArea'); // Assuming this is the element where you show messages
let filter_id = '';


SearchProduct.addEventListener('keydown', async (event) => {
    if (event.keyCode === 13 && SearchProduct.value.trim().length > 0) {
        SearchProduct.disabled = true;
        SearchResetButton.style.display = 'block';
        const SearchProductValue = SearchProduct.value.trim();

        try {
            const url = `https://crud.teamrabbil.com/api/v1/ReadProduct`;
            const response = await axios.get(url);
            const allProductData = await response.data.data; // Accessing the "data" array

            const filteredProduct = await allProductData.find(product => product.ProductCode === SearchProductValue);

            if (filteredProduct) {
                // Update input fields with fetched product data
                document.querySelector('#imgUpdate').value = filteredProduct.Img;
                document.querySelector('#productCodeUpdate').value = filteredProduct.ProductCode;
                document.querySelector('#productNameUpdate').value = filteredProduct.ProductName;
                document.querySelector('#qtyUpdate').value = filteredProduct.Qty;
                document.querySelector('#totalPriceUpdate').value = filteredProduct.TotalPrice;
                document.querySelector('#unitPriceUpdate').value = filteredProduct.UnitPrice;
                document.querySelector('#GetProductListTextArea').value = JSON.stringify(filteredProduct, null, 2);
                document.querySelector('#id').value = filteredProduct._id;
                filter_id = filteredProduct._id;

                // Display the input fields container
                inputGroupHide.style.display = 'block';
            } else {
                // Display an error message
                // document.querySelector('#GetProductListTextArea').value = 'Product Not Found';
                notifyError('Product Not Found Check From "GetProductList"');
                SearchProduct.disabled = false;
                SearchResetButton.style.display = 'none';
                SearchProduct.value = '';


            }

        } catch (error) {
            console.error('Error:', error);
            // Display an error message
            document.querySelector('#GetProductListTextArea').value = 'Error fetching product details';
        }
    }

});
