import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import '@testing-library/jest-dom';

// Mock the child components
jest.mock('../components/ProductList', () => () => <div>Product List Component</div>);
jest.mock('../components/Cart', () => () => <div>Cart Component</div>);

describe('boundary', () => {
  test('AppComponent boundary renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/product inventory/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders the ProductList component', () => {
    render(<App />);
    expect(screen.getByText(/product list component/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders the Cart component', () => {
    render(<App />);
    expect(screen.getByText(/cart component/i)).toBeInTheDocument();
  });
});

