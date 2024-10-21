import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  describe('add', () => {
    const addCases = [
      {
        a: 1,
        b: 2,
        action: Action.Add,
        expected: 3,
      },
      {
        a: 2,
        b: 2,
        action: Action.Add,
        expected: 4,
      },
      {
        a: 3,
        b: 2,
        action: Action.Add,
        expected: 5,
      },
    ];

    it.each(addCases)(`add($a, $b)`, ({ expected, ...payload }) => {
      const resultOfOperation = simpleCalculator(payload);

      expect(resultOfOperation).toEqual(expected);
    });
  });
  describe('substract', () => {
    const subtractCases = [
      { a: 1, b: 2, action: Action.Subtract, expected: -1 },
      { a: 2, b: 2, action: Action.Subtract, expected: 0 },
      { a: 100, b: 5, action: Action.Subtract, expected: 95 },
    ];

    it.each(subtractCases)(`substract($a, $b)`, ({ expected, ...payload }) => {
      const resultOfOperation = simpleCalculator(payload);

      expect(resultOfOperation).toEqual(expected);
    });
  });

  describe('multiply', () => {
    const multiplyCases = [
      { a: 6, b: 2, action: Action.Multiply, expected: 12 },
      { a: 1, b: 0, action: Action.Multiply, expected: 0 },
      { a: 11, b: -11, action: Action.Multiply, expected: -121 },
    ];

    it.each(multiplyCases)(`multiply($a, $b)`, ({ expected, ...payload }) => {
      const resultOfOperation = simpleCalculator(payload);

      expect(resultOfOperation).toEqual(expected);
    });
  });

  describe('divide', () => {
    const divideCases = [
      { a: 6, b: 3, action: Action.Divide, expected: 2 },
      { a: 3, b: 3, action: Action.Divide, expected: 1 },
      { a: 2, b: 0, action: Action.Divide, expected: Infinity },
    ];

    it.each(divideCases)(`divide($a, $b)`, ({ expected, ...payload }) => {
      const resultOfOperation = simpleCalculator(payload);

      expect(resultOfOperation).toEqual(expected);
    });
  });

  describe('exponentiate', () => {
    const exponentiateCases = [
      {
        name: 'should exponentiate two numbers',
        a: 6,
        b: 2,
        action: Action.Exponentiate,
        expected: 36,
      },
    ];
    it.each(exponentiateCases)(
      `exponentiate($a, $b)`,
      ({ expected, ...payload }) => {
        const resultOfOperation = simpleCalculator(payload);

        expect(resultOfOperation).toEqual(expected);
      },
    );
  });

  describe('invalidAction', () => {
    const invalidActionCases = [
      { a: 6, b: 2, action: 'root', expected: null },
      { a: 6, b: 2, action: '***', expected: null },
    ];

    it.each(invalidActionCases)(
      `invalidAction($a, $b, $action)`,
      ({ expected, ...payload }) => {
        const resultOfOperation = simpleCalculator(payload);

        expect(resultOfOperation).toEqual(expected);
      },
    );
  });

  describe('invalidArguments', () => {
    const invalidArgumentsCases = [
      { a: '1', b: 2, action: Action.Add, expected: null },
    ];

    it.each(invalidArgumentsCases)(
      `invalidArguments($a, $b)`,
      ({ expected, ...payload }) => {
        const resultOfOperation = simpleCalculator(payload);

        expect(resultOfOperation).toEqual(expected);
      },
    );
  });
});
