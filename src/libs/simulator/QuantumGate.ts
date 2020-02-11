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

  getOperationResultFromState(initState: QubitState): QubitState {
    const finalState = { ...initState };

    this.operations.forEach(operation => {
      finalState[operation.axis] += operation.value;
    });

    return finalState;
  }
}

export default QuantumGate;
export { Operation };
