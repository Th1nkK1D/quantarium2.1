import QuantumGate from './QuantumGate';
import {
  QuantumStatePresenter,
  CartesianCoord,
  Rotation,
  MeasurementResult,
} from './Interfaces';

type GateInstructionFunction = (
  gate: QuantumGate,
  stateSetter: (stateObj: Rotation, value: CartesianCoord) => Promise<void>,
) => Promise<void>;

class Qubit {
  private statePresenter: QuantumStatePresenter;

  constructor(statePresenter: QuantumStatePresenter) {
    this.statePresenter = statePresenter;
  }

  getCurrentState(): CartesianCoord {
    const { x, y, z } = this.statePresenter.rotation;
    return { x, y, z };
  }

  apply: GateInstructionFunction = this.gateInstructionFactory('getOperationResultFromState');
  revert: GateInstructionFunction = this.gateInstructionFactory('getInvertedOperationResultFromState');

  private gateInstructionFactory(opsName: 'getOperationResultFromState' | 'getInvertedOperationResultFromState'): GateInstructionFunction {
    return async (gate, stateSetter) => {
      const stateSnapshots = gate[opsName](this.getCurrentState());

      return stateSnapshots.reduce((promise: Promise<void>, snapShot) => promise.then(
        () => stateSetter(this.statePresenter.rotation, snapShot),
      ), Promise.resolve());
    };
  }

  measure(times: number): MeasurementResult {
    const { x, y } = this.getCurrentState();
    const probabilityToGetOne = 2 * (x + y);

    const result: MeasurementResult = {
      count: {
        total: times,
        0: 0,
        1: 0,
      },
      shots: [],
    };

    for (let i = 0; i < times; i += 1) {
      const shot = Math.random() < probabilityToGetOne ? 1 : 0;

      result.count[shot] += 1;
      result.shots.push(shot);
    }

    return result;
  }
}

export default Qubit;
