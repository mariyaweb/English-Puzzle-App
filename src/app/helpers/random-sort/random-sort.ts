export function randomSortArr<T>(arr: T[]): T[] {
  const saveArr = arr.slice();
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const k = Math.floor(Math.random() * (i + 1));
    [saveArr[i], saveArr[k]] = [saveArr[k], saveArr[i]];
  }

  if (JSON.stringify(saveArr) === JSON.stringify(arr)) {
    randomSortArr(saveArr);
  }

  return saveArr;
}
