import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store'
import Dashboard from '../Dashboard';
import { LoadingOutlined } from '@ant-design/icons';
import TestRenderer from 'react-test-renderer';

let promise: Promise<void>;

beforeEach(() => {
  promise = Promise.resolve()
})

describe('<Dashboard />', () => {
  test('render loader', async () => {

    const testRenderer = TestRenderer.create(<Provider store={store}><Dashboard /></Provider>);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(LoadingOutlined)).toBeDefined();

    await act(() => promise)
  });

  test('when username is defined, show proper greeting', async () => {
    // TODO: not working, needs fix

    jest.mock('react-redux', () => ({
      useSelector: jest.fn(fn => fn()),
    }));
    jest.mock('../../features/user/userSlice', () => ({
      selectUserName: jest.fn().mockReturnValue("Test User")
    }));

    const { getByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(getByText('Hello there, Test User')).toBeInTheDocument();

    await act(() => promise)
  });
})

