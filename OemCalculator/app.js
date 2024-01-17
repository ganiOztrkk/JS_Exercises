//İş bütününü modüllere ayırdık.

// Storage Controller
const StorageController = (function(){

    //private


    //public
    return{
            
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
        products: [],
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
        getTotal: () => {
            let total = 0
            data.products.forEach((item) =>{
                total += item.price;
            })
            data.totalPrice = total;
            return data.totalPrice;
        }
    }

})();



// UI Controller
const UIController = (function(){

    //private
    const Selectors = {
        productList: "#item-list",
        addButton: ".addBtn",
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
                        <button type="submit" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
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
        hideCard: () => {
            document.querySelector(Selectors.productCard).style.display = "none";
        },
        showTotal: (total) => {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 29;
        }
    }
})();



// App Controller
const App = (function(ProductCtrl, UICtrl){

    //private
    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners
    const loadEventListeners = () => {
        // add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', (e)=>{
            e.preventDefault();
            
            const productName = document.querySelector(UISelectors.productName).value;
            const productPrice = document.querySelector(UISelectors.productPrice).value;
            const totalTl = document.querySelector(UISelectors.totalTL);
            
            if (productName !== "" && productPrice !== "") {
                //add product
                ProductCtrl.addProduct(productName, productPrice);

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
    }


    //public
    return{
        init: () => {
            const products = ProductController.getProducts();
            if (products.length == 0) {
                UICtrl.hideCard();
            }else{
                UIController.createProductList(products);
            }
            // load event listeners
            loadEventListeners();
        }
    }

})(ProductController, UIController);

App.init();