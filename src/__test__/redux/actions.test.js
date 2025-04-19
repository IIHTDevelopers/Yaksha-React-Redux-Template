import { addToCart, removeFromCart, updateCartItem } from "../../redux/actions";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from "../../redux/actions";

describe("boundary", () => {
    test("CartActionsComponent boundary addToCart action should create ADD_TO_CART action", () => {
        const product = { id: 1, title: "Product 1", price: 10 };
        const expectedAction = {
            type: ADD_TO_CART,
            payload: product,
        };
        expect(addToCart(product)).toEqual(expectedAction);
    });

    test("CartActionsComponent boundary removeFromCart action should create REMOVE_FROM_CART action", () => {
        const productId = 1;
        const expectedAction = {
            type: REMOVE_FROM_CART,
            payload: productId,
        };
        expect(removeFromCart(productId)).toEqual(expectedAction);
    });

    test("CartActionsComponent boundary updateCartItem action should create UPDATE_CART_ITEM action", () => {
        const productId = 1;
        const quantity = 2;
        const expectedAction = {
            type: UPDATE_CART_ITEM,
            payload: { productId, quantity },
        };
        expect(updateCartItem(productId, quantity)).toEqual(expectedAction);
    });
});
