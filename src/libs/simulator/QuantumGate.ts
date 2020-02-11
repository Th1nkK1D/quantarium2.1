interface QuantumGateConstructor {
  name: string,
  symbol: string,
  description: string
}

class QuantumGate {
  name: string;
  symbol: string;
  description: string;

  constructor({ name, symbol, description }: QuantumGateConstructor) {
    this.name = name;
    this.symbol = symbol;
    this.description = description;
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
}

export default QuantumGate;
