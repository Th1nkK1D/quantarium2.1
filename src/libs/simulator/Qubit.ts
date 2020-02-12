interface QubitState {
  x: number,
  y: number,
  z: number,
}

interface Rotation {
  x: number,
  y: number,
  z: number,
  set: (x?: number, y?: number, z?: number) => void
}

interface QuantumStatePresenter {
  rotation: Rotation
}

class Qubit {
  private statePresenter: QuantumStatePresenter;

  constructor(statePresenter: QuantumStatePresenter) {
    this.statePresenter = statePresenter;
  }

  getCurrentState(): QubitState {
    const { x, y, z } = this.statePresenter.rotation;
    return { x, y, z };
  }
}

export default Qubit;
export { QuantumStatePresenter };
