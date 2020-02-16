import QuantumGate from '../../../src/libs/simulator/QuantumGate';
import { Operation } from '../../../src/libs/simulator/Interfaces';


describe('QuantumGate', () => {
  const name = 'Hadamard';
  const symbol = 'H';
  const description = 'Put qubit into superposition state';
  const operations: Array<Operation> = [
    { axis: 'z', value: 0.5 },
    { axis: 'y', value: 0.25 },
  ];

  let quantumGate: QuantumGate;

  beforeEach(() => {
    quantumGate = new QuantumGate(name, symbol, description, operations);
  });

  test('should be able to give us name', () => {
    expect(quantumGate.getName()).toBe(name);
  });

  test('should be able to give us symbol', () => {
    expect(quantumGate.getSymbol()).toBe(symbol);
  });

  test('should be able to give us description', () => {
    expect(quantumGate.getDescription()).toBe(description);
  });

  test('should be able to give operation result on a given state', () => {
    const initState = { x: 0, y: 0, z: 0 };
    const expectedStates = [
      { x: 0, y: 0, z: 0.5 },
      { x: 0, y: 0.25, z: 0.5 },
    ];

    expect(quantumGate.getOperationResultFromState(initState)).toEqual(expectedStates);
  });

  test('should be able to give inverted operation on a given state', () => {
    const appliedState = { x: 0, y: 0.25, z: 0.5 };
    const expectedState = [
      { x: 0, y: 0, z: 0.5 },
      { x: 0, y: 0, z: 0 },
    ];

    expect(quantumGate.getInvertedOperationResultFromState(appliedState)).toEqual(expectedState);
  });
});
