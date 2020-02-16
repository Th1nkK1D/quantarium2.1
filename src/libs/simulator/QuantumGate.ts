import { CartesianCoord, Operation } from './Interfaces';

class QuantumGate {
  private name: string;
  private symbol: string;
  private description: string;
  private operations: Array<Operation>;

  constructor(
    name: string,
    symbol: string,
    description: string,
    operations: Array<Operation>,
  ) {
    this.name = name;
    this.symbol = symbol;
    this.description = description;
    this.operations = operations;
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
