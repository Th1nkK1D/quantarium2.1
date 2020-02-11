import QuantumGate from '../../../src/libs/simulator/QuantumGate';

describe('QuantumGate', () => {
  const name = 'Hadamard';
  const symbol = 'H';
  const description = 'Put qubit into superposition state';
  let quantumGate: QuantumGate;

  beforeEach(() => {
    quantumGate = new QuantumGate({ name, symbol, description });
  });

  it('should be able to give us name', () => {
    expect(quantumGate.getName()).toBe(name);
  });

  it('should be able to give us symbol', () => {
    expect(quantumGate.getSymbol()).toBe(symbol);
  });

  it('should be able to give us description', () => {
    expect(quantumGate.getDescription()).toBe(description);
  });
});
