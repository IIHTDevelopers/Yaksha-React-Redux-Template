import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/Cart';
import { removeFromCart, updateCartItem } from '../../redux/actions';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../../redux/actions', () => ({
    removeFromCart: jest.fn(),
    updateCartItem: jest.fn(),
}));

describe('boundary', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockReturnValue([
            { id: 1, title: 'Product 1', price: 10, quantity: 2 },
            { id: 2, title: 'Product 2', price: 20, quantity: 1 },
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('CartComponent boundary displays "Your cart is empty." when cart is empty', () => {
        useSelector.mockReturnValueOnce([]);
        render(<Cart />);

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    test('CartComponent boundary displays the cart items when cart is not empty', () => {
        render(<Cart />);

        expect(screen.getByText(/product 1/i)).toBeInTheDocument();
        expect(screen.getByText(/\$10/i)).toBeInTheDocument();
        expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();

        expect(screen.getByText(/product 2/i)).toBeInTheDocument();
        expect(screen.getByText(/\$20/i)).toBeInTheDocument();
        expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });

    test('CartComponent boundary calls handleRemove when "Remove from Cart" button is clicked', () => {
        render(<Cart />);

        const removeButtons = screen.getAllByText(/remove from cart/i);
        fireEvent.click(removeButtons[0]);

        expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(1));
    });

    test('CartComponent boundary calls handleUpdateQuantity when "Increase Quantity" button is clicked', () => {
        render(<Cart />);

        const increaseButtons = screen.getAllByText(/increase quantity/i);
        fireEvent.click(increaseButtons[0]);

        expect(mockDispatch).toHaveBeenCalledWith(updateCartItem(1, 3));
    });

    test('CartComponent boundary calls handleUpdateQuantity when "Decrease Quantity" button is clicked', () => {
        render(<Cart />);

        const decreaseButtons = screen.getAllByText(/decrease quantity/i);
        fireEvent.click(decreaseButtons[0]);

        expect(mockDispatch).toHaveBeenCalledWith(updateCartItem(1, 1));
    });
});
