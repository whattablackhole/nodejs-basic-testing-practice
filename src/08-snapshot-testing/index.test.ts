import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];

    const list = generateLinkedList(values);

    expect(list).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: 3, next: { next: null, value: null } } },
    });
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2, 3, 4, 5, 6]);

    expect(list).toMatchSnapshot();
  });
});
