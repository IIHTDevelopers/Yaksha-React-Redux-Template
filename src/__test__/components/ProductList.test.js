import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from '../../components/ProductList';
import axiosInstance from '../../services/axiosInstance';
import '@testing-library/jest-dom';

// Mock axios instance
jest.mock('../../services/axiosInstance');

// Create mock store
const mockStore = configureStore([]);
let store;

describe('boundary', () => {
    beforeEach(() => {
        store = mockStore({
            products: {
                products: []
            }
        });
    });

    test('ProductListComponent boundary should display loading text initially', () => {
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );

        expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    });

    test('ProductListComponent boundary should display products when fetched successfully', async () => {
        const products = [{ id: 1, title: 'Product 1', price: 10 }];
        axiosInstance.get.mockResolvedValueOnce({ data: products });
        store = mockStore({
            products: {
                products: products
            }
        });

        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );

        // Await any necessary state updates
        await screen.findByText(/product 1/i);

        expect(screen.getByText(/product 1/i)).toBeInTheDocument();
        expect(screen.getByText(/\$10/i)).toBeInTheDocument();
    });
});

