document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cartModal');
    const productNameElem = document.getElementById('productName');
    const quantityInput = document.getElementById('quantity');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const unavailableButtons = document.querySelectorAll('.unavailable');
    const emailModal = document.getElementById('emailModal');
    const emailInput = document.getElementById('emailInput');
    const submitEmailButton = document.getElementById('submitEmail');
    const closeEmailModalButton = document.getElementById('closeEmailModal');
    const emailMessage = document.getElementById('emailMessage');
    let cart = []; // Array para armazenar os itens do carrinho
    let selectedProduct = null; // Produto atualmente selecionado

    // Impedir ações nos botões indisponíveis
    unavailableButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            emailModal.style.display = 'flex';
        });
    });

    // Abrir modal de quantidade para os produtos disponíveis
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Verificar se o botão é "indisponível"
            if (button.classList.contains('unavailable')) {
                return; // Não faz nada
            }

            const productCard = button.parentElement;
            const productName = productCard.querySelector('.kit-price-title').textContent;
            const productPrice = parseFloat(
                productCard.querySelector('.kit-price-amount').textContent.replace('R$', '').replace(',', '.')
            );

            selectedProduct = { name: productName, price: productPrice }; // Salva o produto selecionado
            productNameElem.textContent = `Produto: ${productName}`;
            quantityInput.value = 1; // Reseta a quantidade para 1
            cartModal.style.display = 'flex'; // Abre o modal
        });
    });

    // Confirmar a quantidade e adicionar ao carrinho
    confirmButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0 && selectedProduct) {
            const existingItem = cart.find(item => item.name === selectedProduct.name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...selectedProduct, quantity });
            }

            updateCart();
            cartModal.style.display = 'none'; // Fecha o modal
        } else {
            alert('Por favor, selecione uma quantidade válida.');
        }
    });

    // Cancelar a seleção de quantidade
    cancelButton.addEventListener('click', () => {
        cartModal.style.display = 'none'; // Fecha o modal
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Atualizar o carrinho
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">Remover</button>
                `;
                cartItems.appendChild(itemDiv);
                total += item.price * item.quantity;
            });
        }

        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Remover item do carrinho
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Finalizar Compra
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio.');
        } else {
            alert('Compra finalizada com sucesso!');
            cart = [];
            updateCart();
        }
    });

    updateCart(); // Atualiza o carrinho ao carregar a página

    // Modal de e-mail para produtos indisponíveis
    submitEmailButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail
    
        if (emailRegex.test(email)) { // Verifica se o e-mail é válido
            emailMessage.style.display = 'block';
            emailMessage.style.color = 'green'; // Exibe mensagem de sucesso
            emailMessage.textContent = 'Obrigado! Você receberá um e-mail assim que o produto estiver disponível.';
            
            setTimeout(() => {
                emailMessage.style.display = 'none';
                emailModal.style.display = 'none';
                emailInput.value = ''; // Limpa o campo
            }, 3000);
        } else {
            emailMessage.style.display = 'block';
            emailMessage.style.color = 'red'; // Exibe mensagem de erro
            emailMessage.textContent = 'Por favor, insira um e-mail válido.';
        }
    });
    

    // Fechar modal de e-mail
    closeEmailModalButton.addEventListener('click', () => {
        emailModal.style.display = 'none';
        emailInput.value = ''; // Limpa o campo
    });

    // Fechar modal de e-mail ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === emailModal) {
            emailModal.style.display = 'none';
            emailInput.value = ''; // Limpa o campo
        }
    });
});
