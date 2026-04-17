function calculateTotal(cart, discountFunc) {
    const total = cart.reduce((acc, curr) => acc + curr, 0);
    return discountFunc(total);
}

const cart = [100, 200, 300];
const finalTotal = calculateTotal(cart, (total) => total - 50);
console.log(finalTotal);
