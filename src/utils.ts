export function get2DArrayOf<T>(
  value: T,
  width: number,
  height: number,
): T[][] {
  return Array.from(Array(height)).map(() =>
    Array.from(Array(width)).map(() => value),
  )
}
