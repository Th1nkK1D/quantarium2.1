export interface Operation {
  axis: 'x' | 'y' | 'z',
  value: number,
}

export interface CartesianCoord {
  x: number,
  y: number,
  z: number,
}

export interface Rotation {
  x: number,
  y: number,
  z: number,
  set: (x: number, y: number, z: number) => void,
}

export interface QuantumStatePresenter {
  rotation: Rotation,
}

export interface MeasurementResult {
  count: {
    total: number,
    0: number,
    1: number,
  },
  shots: Array<0|1>,
}
