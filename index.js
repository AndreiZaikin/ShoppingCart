// создаем функцию поиска товара в корзине
function findItem(name, price) {
    return this.items.find((item) => item.name === name && item.price === price);
};

// создаем функцию добавления товара в корзину, проверяем на наличие товара с таким же именем,
// если есть, увеличиваем количество, если нет - добавляем в корзину новый товар
// после этого добавляем к итогу стоимость
function addItem(name, price, quantity) {
    const item = this.findItem(name, price);
    if (item === undefined) {
        this.items.push({ name, price, quantity });
    } else {
        item.quantity += quantity;
    }
    this.total += price * quantity;
};

// создаем функцию удаления товара из корзины. Поиск осуществляем по имени и цене, но оставляем возможность передать ссылку на товар
// если ссылка пустая, осуществляем поиск товара по наименованию. Если есть ссылка на товар - полностью удаляем его из массива
function removeItem(name, price, item = undefined) {
    item = item ?? this.findItem(name, price);
    if (item !== undefined) {
        this.total -= item.price * item.quantity;
        this.items.splice(this.items.indexOf(item), 1);
    }
};

// создаем функцию обновления количества в корзине. Поиск осуществляем по имени и стоимости, но оставляем возможность передать ссылку на товар
// если находим товар, если количество = 0, удаляем товар из корзины, иначе обновляем количество и пересчитываем итог
function updateQuantity(name, price, quantity, item = undefined) {
    item = item ?? this.findItem(name, price);
    if (item !== undefined) {
        if (quantity === 0) {
            this.removeItem(name, price, item);
        } else {
            this.total = this.total - price * (item.quantity - quantity);
            item.quantity = quantity;
        }
    }
};

// создаем функцию расчета общей стоимости
function calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// создаем функцию очистки корзины
function clearCart() {
    this.items = [];
    this.total = 0;
};

// создаем функцию очистки корзины
function applyDiscount(code) {
    const discount = this.discounts.find((discount) => discount.code === code && discount.valid === true);
    if (discount !== undefined) {
        this.total = Math.round(this.total * (100 - discount.value) / 100);
        discount.valid = false;
    }
};

// создаем функцию вывода сообщений для тестирования
function showLog(message, properties) {
    console.log(message);
    properties.forEach((property) => console.log(this[property]));
};

// создаем корзину, инициализируем начальные значения свойств, присваиваем методы
const discounts = [
    { code: '0123456789', value: 10, valid: true},
    { code: '987654321', value: 50, valid: true}
];
const shoppingCart = {
    items: [],
    discounts,
    total: 0,
    showLog: false,
    findItem,
    addItem,
    removeItem,
    updateQuantity,
    calculateTotal,
    clearCart,
    applyDiscount,
    showLog
};

shoppingCart.addItem('ball', 100, 2);
shoppingCart.showLog(' - add item', ['items']);

shoppingCart.addItem('ball', 200, 2);
shoppingCart.showLog(' - add same item with another price', ['items']);

shoppingCart.addItem('car', 300, 1);
shoppingCart.removeItem('ball', 100);
shoppingCart.showLog(' - remove item ball (100)', ['items']);

shoppingCart.updateQuantity('ball', 200, 1);
shoppingCart.showLog(' - update quantity ball (200) to 1', ['items']);

shoppingCart.total = 0;
shoppingCart.showLog(' - reset total', ['total']);

shoppingCart.calculateTotal();
shoppingCart.showLog(' - recalculate total', ['total']);

shoppingCart.applyDiscount('987654321');
shoppingCart.showLog(' - apply discount 987654321 50%', ['total', 'discounts']);

shoppingCart.applyDiscount('987654321');
shoppingCart.showLog(' - cant apply the same discount, its used', ['total', 'discounts']);

shoppingCart.applyDiscount('0123456789');
shoppingCart.showLog(' - apply discount 0123456789 10%', ['total', 'discounts']);

shoppingCart.clearCart();
shoppingCart.showLog(' - clear cart', ['items', 'total']);
