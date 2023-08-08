export const repeat = <T = unknown>(times: number, _: (item: number) => T) =>
  Array.from(times > 0 ? Array(times).keys() : []).map(_)

  