import QuantumGate from './QuantumGate';
import { QuantumStatePresenter, CartesianCoord, Rotation } from './Interfaces';

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
}

export default Qubit;
