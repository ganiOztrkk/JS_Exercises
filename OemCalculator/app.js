//İş bütününü modüllere ayırdık.

// Storage Controller
const StorageController = (function(){

    //private


    //public
    return{
        storeProduct: (product) => {
            let products;
            if (localStorage.getItem('products') === null) {
                products= [];
                products.push(product);
            }else{
                products =JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts: () => {
            let products;
            if (localStorage.getItem('products') === null) {
                products= [];
            }else{
                products =JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct: (product) => {
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach( (item, index) => {
                if (product.id == item.id) {
                    products.splice(index, 1, product);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        },
        deleteProduct: (product) => {
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach( (item, index) => {
                if (product.id == item.id) {
                    products.splice(index, 1);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

})();



// Product Controller
const ProductController= (function(){

    //private
    class Product {
        constructor(id, name, price){
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    const data = {
        products: StorageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }



    //public
    return{
        getProducts: () => data.products,
        getData: () => data,
        addProduct: (name, price) => {
            let id;
            if (data.products.length > 0) {
                id = data.products[data.products.length-1].id + 1;
            } else {
                id = 0;
            }
            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        updateProduct: (name, price) => {
            let product;
            data.products.forEach((item) => {
                if (item.id == data.selectedProduct.id) {
                    item.name = name;
                    item.price = parseFloat(price);
                    product = item;
                }
            })
            return product;
        },
        deleteProduct: (product) => {
            data.products.forEach( (item, index) => {
                if (item.id == product.id) {
                    data.products.splice(index, 1);
                }
            })
        },
        setCurrentProduct: (product) => {
            data.selectedProduct = product;
        },
        getCurrentProduct: () => {
            return data.selectedProduct; 
        },
        getTotal: () => {
            let total = 0
            data.products.forEach((item) =>{
                total += item.price;
            })
            data.totalPrice = total;
            return data.totalPrice;
        },
        getProductById: (id) => {
            const product = data.products.find(x => x.id == id);
            return product;
        }
    }

})();



// UI Controller
const UIController = (function(){

    //private
    const Selectors = {
        productList: "#item-list", 
        productListItems: "#item-list tr",
        addButton: ".addBtn",
        updateButton: ".updateBtn",
        deleteButton: ".deleteBtn",
        cancelButton: ".cancelBtn",
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: "#total-tl",
        totalDolar: "#total-dolar"
    }



    //public
    return{
        createProductList: (products) => {
            document.querySelector(Selectors.productCard).style.display = "block";
            let html = '';
            products.forEach(item => {
                html += 
                `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}$</td>
                        <td class="text-right">
                            <i class="fas fa-edit edit-product"></i>
                        </td>
                    </tr>
                `
            });
            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: () => Selectors,
        clearInputs: () => {
            document.querySelector(Selectors.productName).value = "";
            document.querySelector(Selectors.productPrice).value = "";
        },
        clearWarnings: () => {
            const items = document.querySelectorAll(Selectors.productListItems);
            items.forEach( (item) => {
                if (item.classList.contains('bg-warning')) {
                    item.classList.remove('bg-warning');
                }
            })
        },
        hideCard: () => {
            document.querySelector(Selectors.productCard).style.display = "none";
        },
        showTotal: (total) => {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 29;
        },
        addProductToForm: () => {
            const product = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = product.name;
            document.querySelector(Selectors.productPrice).value = product.price;
        },
        addingState: () => {
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = "inline";
            document.querySelector(Selectors.updateButton).style.display = "none";
            document.querySelector(Selectors.deleteButton).style.display = "none";
            document.querySelector(Selectors.cancelButton).style.display = "none";
        },
        editState: (tr) => {
            const parent = tr.parentNode;

            for(let i=0; i<parent.children.length; i++ ){
                parent.children[i].classList.remove("bg-warning");
            }

            tr.classList.add("bg-warning");
            document.querySelector(Selectors.addButton).style.display = "none";
            document.querySelector(Selectors.updateButton).style.display = "inline";
            document.querySelector(Selectors.deleteButton).style.display = "inline";
            document.querySelector(Selectors.cancelButton).style.display = "inline";
        }
    }
})();



// App Controller
const App = (function(ProductCtrl, UICtrl, StorageCtrl){

    //private
    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners
    const loadEventListeners = () => {
        // add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', (e)=>{
            e.preventDefault();
            
            const productName = document.querySelector(UISelectors.productName).value;
            const productPrice = document.querySelector(UISelectors.productPrice).value;
            
            if (productName !== "" && productPrice !== "") {
                //add product
                const newProduct = ProductCtrl.addProduct(productName, productPrice);

                //add product to Local Storage
                StorageCtrl.storeProduct(newProduct);

                //add product to list
                UICtrl.createProductList(ProductCtrl.getProducts());

                //get total
                const total = ProductCtrl.getTotal();

                //show total
                UICtrl.showTotal(total);

                //clear inputs
                UICtrl.clearInputs();
            }        
        })

        //edit product click
        document.querySelector(UISelectors.productList).addEventListener('click', (e) =>{
            e.preventDefault();
            if (e.target.classList.contains("edit-product")) {
                const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

                //get selected product
                const product = ProductCtrl.getProductById(id);

                //set current product
                ProductCtrl.setCurrentProduct(product);

                //add product to UI
                UICtrl.addProductToForm();

                //edit state
                UICtrl.editState(e.target.parentNode.parentNode);
            }
        })

        //edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener('click', (e) =>{
            e.preventDefault();
            const productName = document.querySelector(UISelectors.productName).value;
            const productPrice = document.querySelector(UISelectors.productPrice).value;

            if (productName !== "" && productPrice !== "") {
                //update product
                const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);

                //add updated product to list
                UICtrl.createProductList(ProductCtrl.getProducts());

                //get total
                const total = ProductCtrl.getTotal();

                //show total
                UICtrl.showTotal(total);

                //update Local Storage
                StorageCtrl.updateProduct(updatedProduct);

                UICtrl.addingState();
            }
        })

        //cancel product edit
        document.querySelector(UISelectors.cancelButton).addEventListener('click', (e)=>{
            e.preventDefault();

            UICtrl.clearWarnings();
            UICtrl.addingState();
            
        })

        //delete product 
        document.querySelector(UISelectors.deleteButton).addEventListener('click', (e) =>{
            e.preventDefault();
            //get selected product
            const selectedProduct = ProductCtrl.getCurrentProduct();

            //delete product
            ProductCtrl.deleteProduct(selectedProduct);

            //delete product from Local Storage
            StorageCtrl.deleteProduct(selectedProduct);

            //delete ui
            if (ProductCtrl.getProducts().length == 0) {
                UICtrl.hideCard();
            }else{
                UICtrl.createProductList(ProductCtrl.getProducts());
            }


            const total = ProductCtrl.getTotal();

            //show total
            UICtrl.showTotal(total);

            UICtrl.addingState();
        })
    }


    //public
    return{
        init: () => {
            UICtrl.addingState();

            const products = ProductCtrl.getProducts();
            const total = ProductCtrl.getTotal();

            //show total
            UICtrl.showTotal(total);

            if (products.length == 0) {
                UICtrl.hideCard();
            }else{
                UICtrl.createProductList(products);
            }
            // load event listeners
            loadEventListeners();
        }
    }

})(ProductController, UIController, StorageController);

App.init();