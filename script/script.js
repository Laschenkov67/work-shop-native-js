document.addEventListener('DOMContentLoaded', () => {

    //Elements
    const search = document.querySelector('.search');              //Получить строку поиска
    
    //Получаем кнопки по id
    const cartBtn = document.getElementById('cart');               //Получить корзину
    const wishlistBtn = document.getElementById('wishlist');       //Получить список избранных товаров

    const goodsWrapper = document.querySelector('.goods-wrapper'); // Получить обертку для карточек товаров

    const cart = document.querySelector('.cart');

    
    // Функции

    //Создать карточки товаров
    /* @param
        id - id товара
        title - Название товара
        price - Цена товара
        img -  сслылка на изображение товара
    */
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `
        <div class="card">
            <div class="card-img-wrapper">
                <img class="card-img-top" src="${img}" alt="">
                <button class="card-add-wishlist" data-goods-id="${id}"></button>
            </div>
            <div class="card-body justify-content-between">
                <a href="" class="card-title">${title}</a>
                <div class="card-price">${price} ₽</div>
                <div>
                    <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
                </div>
        </div>`;

        return card;
    }

    //Открыть корзину
    const openCart = (e) => {
        e.preventDefault();
        cart.style.display = 'flex';
        document.body.addEventListener('keydown', closeCart);
    }

    //Закрыть корзину
    const closeCart = (e) => {
        const target = event.target;
        if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) {
            cart.style.display = '';
            document.body.removeEventListener('keydown', closeCart);
        }
    }

    goodsWrapper.appendChild(createCardGoods(1, "Дартс", 2000, "img/temp/Archer.jpg"));
    goodsWrapper.appendChild(createCardGoods(2, "Фламинго", 3000, "img/temp/Flamingo.jpg" ));
    goodsWrapper.appendChild(createCardGoods(3, "Носки", 333, "img/temp/Socks.jpg" ));

    //События
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
});