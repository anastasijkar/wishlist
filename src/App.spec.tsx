import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

let promise: Promise<void>;

beforeEach(() => {
  promise = Promise.resolve()
})

describe('<App />', () => {
  test('renders footer copy', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Wishlist ©2021 Created by Anastasiia Rudych')).toBeInTheDocument();
    await act(() => promise)
  });

  test('redirects to login when no auth data nas been found', async () => {
    const mockSuccessResponse = null;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    var globalRef: any = global;

    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Log In')).toBeInTheDocument();
    await act(() => promise)
  });
})

