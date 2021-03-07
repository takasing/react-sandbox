import { render } from '@testing-library/react';
import React from 'react';
import { Counter } from './Counter';
import fireEvent from '@testing-library/user-event';

test('counter increments the count', () => {
  const {container} = render(<Counter/>)
  const button = container.firstChild;
  expect(button.textContent).toBe('0')
  fireEvent.click(button)
  expect(button.textContent).toBe('1')
})
