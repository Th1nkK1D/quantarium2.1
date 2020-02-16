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
        set(x?: number, y?: number, z?: number) {
          this.x = x || this.x;
          this.y = y || this.y;
          this.z = z || this.z;
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
    await qubit.apply(
      hadamardGate,
      (object: Rotation, value: CartesianCoord) => new Promise(resolve => {
        Object.assign(object, value);
        resolve();
      }),
    );

    const state = getQubitStateFromPresenter(mockQuantumStatePresenter);

    expect(state).toEqual(expectedState);
  });
});
