import QuantumGate from './QuantumGate';
import { QuantumStatePresenter, CartesianCoord, Rotation } from './Interfaces';

class Qubit {
  private statePresenter: QuantumStatePresenter;

  constructor(statePresenter: QuantumStatePresenter) {
    this.statePresenter = statePresenter;
  }

  getCurrentState(): CartesianCoord {
    const { x, y, z } = this.statePresenter.rotation;
    return { x, y, z };
  }

  async apply(
    gate: QuantumGate,
    stateSetter: (stateObj: Rotation, value: CartesianCoord) => Promise<void>,
  ): Promise<void> {
    const stateSnapshots = gate.getOperationResultFromState(this.getCurrentState());

    return stateSnapshots.reduce((promise: Promise<void>, snapShot) => promise.then(
      () => stateSetter(this.statePresenter.rotation, snapShot),
    ), Promise.resolve());
  }
}

export default Qubit;
