import { simpleCalculator, Action } from './index';
import assert from 'assert/strict';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    assert.equal(result, 3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Subtract });
    assert.equal(result, -1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Multiply });
    assert.equal(result, 12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Divide });
    assert.equal(result, 3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 6,
      b: 2,
      action: Action.Exponentiate,
    });
    assert.equal(result, 36);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: 'root' });
    assert.equal(result, null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '1', b: 2, action: Action.Add });
    assert.equal(result, null);
  });
});
