import store from "../../redux/store";
import { addToCart, removeFromCart } from "../../redux/actions";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../redux/actions";

describe("boundary", () => {
    test("ReduxStoreComponent boundary should add a product to the cart", () => {
        const product = { id: 1, title: "Product 1", price: 10 };
        store.dispatch(addToCart(product));

        const state = store.getState();
        expect(state.cart.items).toHaveLength(1);
        expect(state.cart.items[0].id).toBe(product.id);
    });

    test("ReduxStoreComponent boundary should remove a product from the cart", () => {
        const productId = 1;
        store.dispatch(removeFromCart(productId));

        const state = store.getState();
        expect(state.cart.items).toHaveLength(0);
    });
});
