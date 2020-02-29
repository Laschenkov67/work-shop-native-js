document.addEventListener("DOMContentLoaded", () => {
    // Элементы DOM
    const search = document.querySelector(".search"),
      goodsWrapper = document.querySelector(".goods-wrapper"),
      cartBtn = document.getElementById("cart"),
      cart = document.querySelector(".cart"),
      category = document.querySelector(".category"),

      cartWrapper = document.querySelector(".cart-wrapper");
  

  
    //  функция, показывающая спинер в каталоге и в корзине
    const loading = () => {
      const spinner = `
              <div id="spinner" ><div class="spinner-loading">
              <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>
          `;
      goodsWrapper.innerHTML = spinner; // каталог
      cartWrapper.innerHTML = spinner; // корзина
    };
  
    // Создаем карточку товара для каталога
    const createCardGoods = (id, title, price, img) => {
      const card = document.createElement("div");
      card.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3";
      card.innerHTML = `<div class="card">
                <div class="card-img-wrapper">
                  <img class="card-img-top" src="${img}" alt="${title}">
                  <button 
                    class="card-add-wishlist"
                    data-goods-id="${id}">
                  </button>
                </div>
                <div class="card-body justify-content-between">
                  <a href="#" class="card-title">${title}</a>
                  <div class="card-price">${price} ₽</div>
                  <div>
                    <button 
                      class="card-add-cart" 
                      data-goods-id="${id}">Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>`;
      return card;
    };
  
  
    // Рендеринг одной карточки товара для корзины
    const createGardGoodsBasket = (id, title, price, img) => {
      const card = document.createElement("div");
      card.className = "goods";
      card.innerHTML = `
              <div class="goods-img-wrapper">
                  <img class="goods-img" src="${img}" alt="">
              </div>
              <div class="goods-description">
                  <h2 class="goods-title">${title}</h2>
                  <p class="goods-price">${price} ₽</p>
              </div>
              <div class="goods-price-count">
                  <div class="goods-trigger">
                      <button class="goods-add-wishlist ${
                        wishlist.includes(id) ? "active" : ""
                      }" data-goods-id="${id} "></button>
                      <button class="goods-delete" data-goods-id="${id}"></button>
                  </div>
                  <div class="goods-count">${goodsBasket[id]}</div>
              </div>
          `;
      return card;
    };
  
    // Рендеринг карточек товаров
    const renderCard = items => {
      goodsWrapper.textContent = "";
      if (items.length) {
        items.forEach(({ id, title, price, imgMin }) => {
          goodsWrapper.append(createGardsGoods(id, title, price, imgMin));
        });
      } else {
        goodsWrapper.textContent = "❌ Товар не найден";
      }
    };
  
  
    // Открываем корзину
    //  - фильтр товаров для корзины
    const showCardBasket = goods => {
      const basketGoods = goods.filter(item =>
        goodsBasket.hasOwnProperty(item.id)
      );
      calcTotalPrice(basketGoods);
      return basketGoods;
    };

    //  - рендеринг корзины
    const openCart = event => {
      event.preventDefault();
      cart.style.display = "flex";
      document.addEventListener("keyup", closeCart);
      getGoods(renderBasket, showCardBasket);
      goodsWrapper.innerHTML = "";
    };
  
    // Закрываем корзину
    const closeCart = event => {
      const target = event.target;
  
      if (
        target === cart ||
        target.classList.contains("cart-close") ||
        event.keyCode === 27
      ) {
        cart.style.display = "";
        document.addEventListener("keyup", closeCart);
        getGoods(renderCard, randomSort);
      }
    };
  
    // Извлечение карточек из БД с их последующей фильтрацией и рендиренгом
    const getGoods = (handler, filter) => {
      loading(); // спиннер
      setTimeout(() => {
        // для демонстрации спинера
        fetch("db/db.json") // извлечение товаров из БД
          .then(response => response.json())
          .then(filter) // фильтрация
          .then(handler); // рендеринг
      }, 1000);
    };
  
    // Сортировка карточек в случайном порядке
    const randomSort = goods => goods.sort(() => Math.random() - 0.5);
  
    //  Используем замыкание и создаем функцию для фильтрации товаров по категории.
    const wrapperCategoryFilter = category => goods =>
      goods.filter(item => item.category.includes(category));
  
    // Выбор карточек из определенной категории
    const chooseCategory = event => {
      event.preventDefault();
      const target = event.target;
  
      if (target.classList.contains("category-item")) {
        const category = target.dataset.category;
        // Создаем альтернативный фильтр с помощью метода bind()
        // const categoryFilter = goods => goods.filter(item => item.category.includes(category))
        // categoryFilter.bind(this, category)
        const categoryFilter = wrapperCategoryFilter(category);
        getGoods(renderCard, categoryFilter);
      }
    };
  
   
    // Навешиваем обработчики событий
    category.addEventListener("click", chooseCategory); // товары из выбранной категории
    cartBtn.addEventListener("click", openCart);
    cart.addEventListener("click", closeCart);

  
    // Загрузка карточек при инициализации магазина
    getGoods(renderCard, randomSort);

  });