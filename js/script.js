    let navbar = document.querySelector('.navbar');

    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
    }

    let searchForm = document.querySelector('.search-form');

    document.querySelector('#search-btn').onclick = () =>{
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
    }

    window.onscroll = () =>{
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    }


    if (document.readyState == 'loading') {
          document.addEventListener('DOMContentLoaded', ready)
        } else {
          ready()
        }

        var totalAmount = "0,00"

        function ready() {
          // Botão remover produto
          const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
          for (var i = 0; i < removeCartProductButtons.length; i++) {
            removeCartProductButtons[i].addEventListener("click", removeProduct)
          }

          // Mudança valor dos inputs
          const quantityInputs = document.getElementsByClassName("product-qtd-input")
          for (var i = 0; i < quantityInputs.length; i++) {
            quantityInputs[i].addEventListener("change", checkIfInputIsNull)
          }

          // Botão add produto ao carrinho
          const addToCartButtons = document.getElementsByClassName("button-hover-background")
          for (var i = 0; i < addToCartButtons.length; i++) {
            addToCartButtons[i].addEventListener("click", addProductToCart)
          }

          // Botão comprar
          const purchaseButton = document.getElementsByClassName("purchase-button")[0]
          purchaseButton.addEventListener("click", makePurchase)
        }

        function removeProduct(event) {
          event.target.parentElement.parentElement.remove()
          updateTotal()
        }

        function checkIfInputIsNull(event) {
          if (event.target.value === "0") {
            event.target.parentElement.parentElement.remove()
          }

          updateTotal()
        }

        function addProductToCart(event) {
          const button = event.target
          const productInfos = button.parentElement.parentElement
          const productImage = productInfos.getElementsByClassName("product-image")[0].src
          const productName = productInfos.getElementsByClassName("product-title")[0].innerText
          const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

          const productsCartNames = document.getElementsByClassName("cart-product-title")
          for (var i = 0; i < productsCartNames.length; i++) {
            if (productsCartNames[i].innerText === productName) {
              productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
              updateTotal()
              return
            }
          }

          let newCartProduct = document.createElement("tr")
          newCartProduct.classList.add("cart-product")

          newCartProduct.innerHTML =
            `
              <td class="product-identification">
                <img src="${productImage}" alt="${productName}" class="cart-product-image">
                <h3 class="cart-product-title">${productName}</h3>
              </td>
              <td>
                <span class="cart-product-price">${productPrice}</span>
              </td>
              <td>
                <input type="number" value="1" min="0" class="product-qtd-input">
                <button type="button" class="remove-product-button">Remover</button>
              </td>
            `
          
          const tableBody = document.querySelector(".cart-table tbody")
          tableBody.append(newCartProduct)
          updateTotal()

          newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
          newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
        }

        function makePurchase() {
          if (totalAmount === "0,00") {
            alert("Seu carrinho está vazio!")
          } else {   
            alert(
              `
                Obrigado pela sua compra!
                Valor do pedido: R$${totalAmount}\n
                Volte sempre :)
              `
            )

            document.querySelector(".cart-table tbody").innerHTML = ""
            updateTotal()
          }
        }

        // Atualizar o valor total do carrinho
        function updateTotal() {
          const cartProducts = document.getElementsByClassName("cart-product")
          totalAmount = 0

          for (var i = 0; i < cartProducts.length; i++) {
            const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
            const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

            totalAmount += productPrice * productQuantity
          }
          
          totalAmount = totalAmount.toFixed(2)
          totalAmount = totalAmount.replace(".", ",")
          document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
        }



    document.addEventListener("DOMContentLoaded", function () {
        
            // Função para abrir o modal de pagamento
            function openPaymentModal() {
                var modal = document.getElementById("payment-modal");
                modal.style.display = "block";
            }
            
            // Função para fechar o modal
            function closePaymentModal() {
                var modal = document.getElementById("payment-modal");
                modal.style.display = "none";
            }
            
            // Event listener para abrir o modal quando um produto é clicado
            var addToCartButtons = document.querySelectorAll(".add-to-cart");
            addToCartButtons.forEach(function(button) {
                button.addEventListener("click", openPaymentModal);
            });
            
            // Event listener para fechar o modal quando o usuário clica em "X"
            var closeButton = document.querySelector(".close");
            closeButton.addEventListener("click", closePaymentModal);
            
            // Event listener para lidar com a escolha da forma de pagamento
            var paymentMethods = document.querySelectorAll(".payment-method");
            paymentMethods.forEach(function(button) {
                button.addEventListener("click", function() {
                    var selectedMethod = button.getAttribute("data-method");
            
                    // Esconda todos os detalhes de pagamento
                    var paymentDetails = document.querySelectorAll(".payment-details");
                    paymentDetails.forEach(function(detail) {
                        detail.style.display = "none";
                    });
            
                    // Mostre os detalhes específicos da forma de pagamento selecionada
                    if (selectedMethod === "cartao") {
                        document.getElementById("cartao-details").style.display = "block";
                    } else if (selectedMethod === "pix") {
                        document.getElementById("pix-details").style.display = "block";
                    } else if (selectedMethod === "qr") {
                        document.getElementById("qr-details").style.display = "block";
                    }
                });
            });

            // Event listener para lidar com o pagamento com Pix
            document.getElementById("pix-pagar").addEventListener("click", function(e) {
                e.preventDefault();
                // Aqui você pode adicionar a lógica real para processar o pagamento com Pix
                // Por enquanto, estamos apenas ocultando os detalhes
                document.getElementById("pix-details").style.display = "none";
                alert("Pagamento com Pix efetuado com sucesso!");
                closePaymentModal();
            });
            
            // Event listener para lidar com o pagamento com QR Code
            document.getElementById("qr-pagar").addEventListener("click", function(e) {
                e.preventDefault();
                // Aqui você pode adicionar a lógica real para processar o pagamento com QR Code
                // Por enquanto, estamos apenas ocultando os detalhes
                document.getElementById("qr-details").style.display = "none";
                alert("Pagamento com QR Code efetuado com sucesso!");
                closePaymentModal();
            });

    });
