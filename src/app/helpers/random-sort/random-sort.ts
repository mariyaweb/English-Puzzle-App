export function randomSortArr(arr: string[]): string[] | undefined {
  const saveArr = arr.slice();
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const k = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[k]] = [arr[k], arr[i]];
  }

  if (JSON.stringify(saveArr) === JSON.stringify(arr)) {
    randomSortArr(arr);
  } else {
    return arr;
  }

}
