interface Field {
  [key: string]: string | number;
}

export default function fieldSort(
  arr: Field[],
  fields: string[],
  reverse = false
): Field[] {
  const direction = reverse ? -1 : 1;

  return [...arr].sort((a, b) =>
    fields.reduce((acc, field, index, array) => {
      const fieldValueA = a[field] || 0;
      const fieldValueB = b[field] || 0;

      const normalizedA = typeof fieldValueA === 'string' ? fieldValueA.toLocaleLowerCase() : fieldValueA;
      const normalizedB = typeof fieldValueB === 'string' ? fieldValueB.toLocaleLowerCase() : fieldValueB;

      if (normalizedA > normalizedB) {
        return acc + direction * (array.length - index);
      } if (normalizedA < normalizedB) {
        return acc - direction * (array.length - index);
      }

      return acc;
    }, 0)
  );
}
