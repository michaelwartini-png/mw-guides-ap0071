/**
 * AP-PP000 — shared equirectangular projection for the Europe overview map.
 * Land outlines and trip markers use the same bounds so pins sit on the
 * correct regions without looking like a street map.
 */

export const EUROPE_MAP = {
  width: 1000,
  height: 820,
  lonMin: -12,
  lonMax: 32,
  latMin: 34,
  latMax: 72,
} as const;

export function projectEurope(lon: number, lat: number) {
  const { width, height, lonMin, lonMax, latMin, latMax } = EUROPE_MAP;
  return {
    x: ((lon - lonMin) / (lonMax - lonMin)) * width,
    y: ((latMax - lat) / (latMax - latMin)) * height,
  };
}

/** Extra water around the continent so the overview does not feel cropped. */
export const EUROPE_MAP_PAD = { x: 56, y: 48 } as const;

export function europePercent(lon: number, lat: number) {
  const { x, y } = projectEurope(lon, lat);
  const width = EUROPE_MAP.width + EUROPE_MAP_PAD.x * 2;
  const height = EUROPE_MAP.height + EUROPE_MAP_PAD.y * 2;
  return {
    left: ((x + EUROPE_MAP_PAD.x) / width) * 100,
    top: ((y + EUROPE_MAP_PAD.y) / height) * 100,
  };
}

function pathFrom(points: readonly (readonly [number, number])[]) {
  return (
    points
      .map(([lon, lat], i) => {
        const { x, y } = projectEurope(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

/** Simplified inspirational coastline — not a cadastral or road map. */
const MAINLAND: readonly (readonly [number, number])[] = [
  [-9.5, 38.8],
  [-8.9, 37.1],
  [-6.4, 36.1],
  [-5.6, 36.0],
  [-2.2, 36.8],
  [0.1, 38.9],
  [3.1, 41.8],
  [3.2, 42.5],
  [4.9, 43.4],
  [7.4, 43.7],
  [8.2, 44.1],
  [8.8, 44.4],
  [9.8, 44.0],
  [8.4, 40.7],
  [8.9, 38.9],
  [12.5, 38.2],
  [15.6, 38.2],
  [17.1, 40.5],
  [18.4, 40.3],
  [18.3, 39.8],
  [16.6, 41.3],
  [13.8, 42.9],
  [12.6, 45.4],
  [13.7, 45.7],
  [14.6, 45.3],
  [16.1, 43.5],
  [18.5, 42.5],
  [19.5, 41.9],
  [19.9, 40.1],
  [21.0, 38.3],
  [22.5, 36.5],
  [23.7, 35.9],
  [24.2, 37.8],
  [23.2, 39.1],
  [24.0, 40.0],
  [26.3, 40.1],
  [27.4, 40.9],
  [27.9, 42.1],
  [28.6, 43.5],
  [28.6, 45.1],
  [29.6, 45.4],
  [28.8, 46.6],
  [25.2, 47.8],
  [24.1, 50.1],
  [23.2, 52.3],
  [23.4, 54.4],
  [21.2, 55.0],
  [21.8, 56.8],
  [24.8, 59.4],
  [28.0, 59.5],
  [28.4, 60.6],
  [22.6, 60.5],
  [21.3, 61.1],
  [21.6, 62.8],
  [24.8, 65.7],
  [25.8, 68.5],
  [21.5, 70.1],
  [16.2, 69.2],
  [12.5, 66.0],
  [10.2, 63.6],
  [5.4, 62.3],
  [5.0, 60.5],
  [5.6, 59.0],
  [8.1, 58.0],
  [8.6, 57.0],
  [8.2, 54.9],
  [8.6, 53.6],
  [6.9, 53.5],
  [4.8, 53.2],
  [4.4, 51.9],
  [3.4, 51.5],
  [2.5, 51.1],
  [1.6, 50.8],
  [1.5, 50.1],
  [-1.2, 49.4],
  [-4.6, 48.6],
  [-4.7, 47.8],
  [-2.2, 47.2],
  [-1.5, 45.6],
  [-1.5, 43.5],
  [-1.8, 43.3],
  [-5.5, 43.4],
  [-8.0, 43.6],
  [-8.9, 42.1],
  [-8.9, 40.2],
];

const BRITAIN: readonly (readonly [number, number])[] = [
  [-5.5, 50.1],
  [-5.1, 51.6],
  [-4.2, 53.3],
  [-4.6, 54.6],
  [-3.6, 56.0],
  [-5.6, 57.3],
  [-6.2, 56.6],
  [-5.1, 58.6],
  [-3.1, 58.6],
  [-1.8, 57.6],
  [-1.6, 55.0],
  [1.6, 52.9],
  [1.4, 51.4],
  [1.3, 51.1],
  [-0.3, 50.7],
  [-3.6, 50.2],
];

const IRELAND: readonly (readonly [number, number])[] = [
  [-10.0, 51.6],
  [-9.6, 52.3],
  [-10.1, 53.4],
  [-8.6, 54.4],
  [-6.2, 55.3],
  [-5.5, 54.3],
  [-6.1, 53.3],
  [-6.2, 52.1],
  [-8.4, 51.5],
];

const SICILY: readonly (readonly [number, number])[] = [
  [12.5, 38.1],
  [13.3, 37.2],
  [15.1, 36.7],
  [15.5, 38.1],
  [14.2, 38.2],
];

const SARDINIA: readonly (readonly [number, number])[] = [
  [8.2, 39.0],
  [8.3, 41.1],
  [9.6, 40.9],
  [9.6, 39.2],
];

const CORSICA: readonly (readonly [number, number])[] = [
  [8.6, 41.4],
  [9.0, 43.0],
  [9.6, 41.6],
];

const CRETE: readonly (readonly [number, number])[] = [
  [23.5, 35.3],
  [26.2, 35.2],
  [26.0, 35.6],
  [23.7, 35.6],
];

const ZEALAND: readonly (readonly [number, number])[] = [
  [10.9, 55.2],
  [12.6, 55.3],
  [12.6, 56.1],
  [11.2, 56.0],
];

export const EUROPE_LAND_PATHS = [
  pathFrom(MAINLAND),
  pathFrom(BRITAIN),
  pathFrom(IRELAND),
  pathFrom(SICILY),
  pathFrom(SARDINIA),
  pathFrom(CORSICA),
  pathFrom(CRETE),
  pathFrom(ZEALAND),
];
