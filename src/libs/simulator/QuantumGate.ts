import { CartesianCoord } from './Qubit';

interface QuantumGateConstructor {
  name: string,
  symbol: string,
  description: string,
  operations: Array<Operation>,
}

interface Operation {
  axis: 'x' | 'y' | 'z',
  value: number,
}

class QuantumGate {
  private name: string;
  private symbol: string;
  private description: string;
  private operations: Array<Operation>;

  constructor(prop: QuantumGateConstructor) {
    this.name = prop.name;
    this.symbol = prop.symbol;
    this.description = prop.description;
    this.operations = prop.operations;
  }

  getName() {
    return this.name;
  }

  getSymbol() {
    return this.symbol;
  }

  getDescription() {
    return this.description;
  }

  getOperationResultFromState(initState: CartesianCoord): Array<CartesianCoord> {
    return QuantumGate.getStateSnapshotsFromEachOperation(initState, this.operations);
  }

  getInvertedOperationResultFromState(initState: CartesianCoord): Array<CartesianCoord> {
    return QuantumGate.getStateSnapshotsFromEachOperation(initState, this.operations.reverse(), -1);
  }

  private static getStateSnapshotsFromEachOperation(
    initState: CartesianCoord,
    operations: Array<Operation>,
    multiplier = 1,
  ): Array<CartesianCoord> {
    const stateSnapshots: Array<CartesianCoord> = [];
    let lastState = initState;

    operations.forEach(operation => {
      const currentState: CartesianCoord = {
        ...lastState,
        [operation.axis]: lastState[operation.axis] + (multiplier * operation.value),
      };

      stateSnapshots.push(currentState);

      lastState = currentState;
    });

    return stateSnapshots;
  }
}

export default QuantumGate;
export { Operation };
