import { cartReducer } from "../../redux/reducers";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from "../../redux/actions";

describe("boundary", () => {
    const initialState = { items: [] };

    test("CartReducerComponent boundary should handle ADD_TO_CART", () => {
        const product = { id: 1, title: "Product 1", price: 10 };
        const action = { type: ADD_TO_CART, payload: product };
        const expectedState = { items: [{ ...product, quantity: 1 }] };

        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });

    test("CartReducerComponent boundary should handle REMOVE_FROM_CART", () => {
        const state = { items: [{ id: 1, title: "Product 1", price: 10, quantity: 1 }] };
        const action = { type: REMOVE_FROM_CART, payload: 1 };
        const expectedState = { items: [] };

        expect(cartReducer(state, action)).toEqual(expectedState);
    });

    test("CartReducerComponent boundary should handle UPDATE_CART_ITEM", () => {
        const state = { items: [{ id: 1, title: "Product 1", price: 10, quantity: 1 }] };
        const action = { type: UPDATE_CART_ITEM, payload: { productId: 1, quantity: 2 } };
        const expectedState = { items: [{ id: 1, title: "Product 1", price: 10, quantity: 2 }] };

        expect(cartReducer(state, action)).toEqual(expectedState);
    });
});
