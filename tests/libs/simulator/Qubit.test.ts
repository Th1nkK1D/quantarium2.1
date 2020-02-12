import Qubit, { QuantumStatePresenter } from '../../../src/libs/simulator/Qubit';

describe('Qubit', () => {
  test('should be able to give the current state', () => {
    const initState = { x: 0, y: 0, z: 0 };
    const mockQuantumStatePresenter: QuantumStatePresenter = {
      rotation: { ...initState, set: () => {} },
    };

    const qubit = new Qubit(mockQuantumStatePresenter);

    expect(qubit.getCurrentState()).toEqual(initState);
  });
});
