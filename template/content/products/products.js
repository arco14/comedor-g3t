window.addEventListener("DOMContentLoaded", () => {
    const url = CONFIG.API_URL
    let products, container

    async function generarCard() {
        const jsonTest = {
            Stored: 'dbo.PA_ComedorG3T',
            Opcion: 'C',
            Usuario: 'christian.acosta'
        }
        const resData = await loadAPI(`${url}COMEDOR`, 'POST', jsonTest, '', false)
        console.log(resData)
        products = resData.response[0]

        //? CARDS DE PRODUCTOS
        container = document.getElementById('productsContainer')
        products.forEach(product => {
            const card = document.createElement('div')
            card.className = 'card-product border bg-white'
            card.innerHTML = `
                <img loading="lazy" class="img-product" src="../../../../comedor/assets/img/${product.IMG}" alt="img-${product.NOMBRE}">
                <p class="mt-2 text-uppercase flex-grow-1 mb-0">${product.NOMBRE}</p>
                <div class="d-flex justify-content-end mt-2">
                    <span class="mb-2" style="color: #e89c00; font-size: 1.2rem;">$ ${product.PRECIO}</span>
                </div>
                <div class="d-flex justify-content-end img-add">
                    <button class="btn btn-sm rounded btn-add" data-id="${product.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>`
            container.appendChild(card)
        })

        //? CLICK EN CARDS → AGREGAR
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add')
            if (!btn) return

            const productId = btn.dataset.id
            const product = products.find(p => p.id == productId)

            addToCart(product)
        })
    }

    generarCard()
    //? DATA CARRITO
    const cart = []

    // //? AGREGAR AL CARRITO
    function addToCart(product) {
        const exists = cart.find(item => item.id === product.id)
        if (exists) {
            exists.qty++
        } else {
            cart.push({
                id: product.id,
                name: product.NOMBRE,
                img: `../../../../comedor/assets/img/${product.IMG}`,
                price: product.PRECIO,
                qty: 1
            })
        }
        updateCartInfo()
        renderCart()
    }

    function updateCartInfo() {
        const totalQty = cart.reduce((total, item) => total + item.qty, 0)
        const totalPrice = cart.reduce((total, item) => total + (item.qty * item.price), 0)

        const qtyEl = document.getElementById('cartCount')
        const priceEl = document.getElementById('cartTotal')

        if (qtyEl) qtyEl.textContent = totalQty
        if (priceEl) priceEl.textContent = `$${totalPrice.toFixed(2)}`
        $('#totalArticulo').val(totalQty)
        $('#totalPrecio').val(totalPrice.toFixed(2))
    }

    //? RENDER CARRITO
    function renderCart() {
        const cartContainer = document.getElementById('cartProducts')
        if (!cartContainer) return

        cartContainer.innerHTML = ''

        cart.forEach(item => {
            const row = document.createElement('div')
            row.className = 'd-flex align-items-center justify-content-between mb-4  position-relative cardProductCart p-3'

            row.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <img loading="lazy" src="${item.img}" class="rounded"
                     style="width:100px; height:100px; object-fit:cover;">
                <p class="fw-semibold h3 text-uppercase" style="color:#6B7280">${item.name} <span style="color: #e89c00;">$ ${item.price}</span></p>
            </div>

            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btnActionCar px-3 btn-minus fw-semibold" data-id="${item.id}">−</button>
                <p class="px-2 mb-0" style="font-size:1.7rem; color:#e89c00;">${item.qty}</p>
                <button class="btn btn-sm btnActionCar px-3 btn-plus fw-semibold" data-id="${item.id}">+</button>
                <button class="btn btnDeleteProd px-3 btn-remove fw-semibold" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>`
            cartContainer.appendChild(row)
        })
        const total = $('#totalArticulo').val()
        const precio = $('#totalPrecio').val()
        $('#total').html(total)
        $('#precio').html(`$ ${precio}`)
    }


    // //? EVENTOS DEL CARRITO
    $('#cartProducts').click((e) => {
        const btn = e.target.closest('button')
        if (!btn) return

        const id = btn.dataset.id
        if (!id) return

        const item = cart.find(p => p.id == id)
        if (!item) return

        //? ➕
        if (btn.classList.contains('btn-plus')) {
            item.qty++
        }

        //? ➖
        if (btn.classList.contains('btn-minus')) {
            item.qty--
            if (item.qty <= 0) {
                removeItem(id)
                return
            }
        }

        //? ❌
        if (btn.classList.contains('btn-remove')) {
            removeItem(id)
            return
        }

        updateCartInfo()
        renderCart()
    })

    //? ELIMINAR PRODUCTO
    function removeItem(id) {
        const index = cart.findIndex(p => p.id == id)
        if (index !== -1) cart.splice(index, 1)
        updateCartInfo()
        renderCart()
    }


    //? IMPRIMIR CONSUMO
    $('.btnConsumo').click(() => {
        console.log(cart)
    })

})