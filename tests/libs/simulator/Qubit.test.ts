import Qubit from '../../../src/libs/simulator/Qubit';
import QuantumGate from '../../../src/libs/simulator/QuantumGate';
import { QuantumStatePresenter, Rotation, CartesianCoord } from '../../../src/libs/simulator/Interfaces';

let mockQuantumStatePresenter: QuantumStatePresenter;
let qubit: Qubit;

const hadamardGate = new QuantumGate(
  'Hadamard Gate',
  'H',
  '...',
  [
    { axis: 'z', value: 0.5 },
    { axis: 'y', value: 0.25 },
  ],
);

const mockStateSetter: (object: Rotation, value: CartesianCoord) => Promise<void> = (
  object: Rotation,
  value: CartesianCoord,
) => new Promise(resolve => {
  object.set(value.x, value.y, value.z);
  resolve();
});

const getQubitStateFromPresenter = (
  { rotation: { x, y, z } }: QuantumStatePresenter,
) => ({ x, y, z });

describe('Qubit', () => {
  beforeEach(() => {
    mockQuantumStatePresenter = {
      rotation: {
        x: 0,
        y: 0,
        z: 0,
        set(x: number, y: number, z: number) {
          this.x = x;
          this.y = y;
          this.z = z;
        },
      },
    };

    qubit = new Qubit(mockQuantumStatePresenter);
  });

  test('should be able to give the current state', () => {
    const state = getQubitStateFromPresenter(mockQuantumStatePresenter);

    expect(qubit.getCurrentState()).toEqual(state);
  });

  test('should change quantum state when apply gate', async () => {
    const expectedState = { x: 0, y: 0.25, z: 0.5 };

    await qubit.apply(hadamardGate, mockStateSetter);

    const state = getQubitStateFromPresenter(mockQuantumStatePresenter);

    expect(state).toEqual(expectedState);
  });

  test('should change quantum state back when invert gate', async () => {
    const expectedState = { x: 0, y: 0, z: 0 };

    await qubit.apply(hadamardGate, mockStateSetter);
    await qubit.revert(hadamardGate, mockStateSetter);

    const state = getQubitStateFromPresenter(mockQuantumStatePresenter);

    expect(state).toEqual(expectedState);
  });

  describe('measurement', () => {
    const times = 100;

    test('count and shots should be related', async () => {
      await qubit.apply(hadamardGate, mockStateSetter);

      const result = qubit.measure(times);

      expect(result.count.total).toBe(times);
      expect(result.shots.length).toBe(result.count.total);
      expect(result.shots.filter(shot => shot === 0).length).toBe(result.count[0]);
      expect(result.shots.filter(shot => shot === 1).length).toBe(result.count[1]);
    });

    test('ground state should give all 0', () => {
      const result = qubit.measure(times);

      expect(result.count[0]).toBe(times);
    });

    test('equally super position state should give similar result of 0 and 1', async () => {
      await qubit.apply(hadamardGate, mockStateSetter);
      const result = qubit.measure(times);
      const zeroRatio = result.count[0] / result.count.total;

      expect(zeroRatio).toBeGreaterThan(0.4);
      expect(zeroRatio).toBeLessThan(0.6);
    });
  });
});
