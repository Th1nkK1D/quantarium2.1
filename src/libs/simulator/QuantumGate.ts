interface QuantumGateConstructor {
  name: string,
  symbol: string,
  description: string,
  operations: Array<Operation>,
}

interface QubitState {
  x: number,
  y: number,
  z: number,
}

interface Operation {
  axis: 'x' | 'y' | 'z',
  value: number,
}

class QuantumGate {
  name: string;
  symbol: string;
  description: string;
  operations: Array<Operation>;

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

  getOperationResultFromState(initState: QubitState): Array<QubitState> {
    const resultStates: Array<QubitState> = [];
    let lastState = initState;

    this.operations.forEach(operation => {
      const currentState: QubitState = {
        ...lastState,
        [operation.axis]: lastState[operation.axis] + operation.value,
      };

      resultStates.push(currentState);

      lastState = currentState;
    });

    return resultStates;
  }
}

export default QuantumGate;
export { Operation };
