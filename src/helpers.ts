export function groupBy<T>(values: T[], size: number) {
  const { groups, group } = values.reduce<{ groups: T[][]; group: T[] }>(
    ({ groups, group }, x, i, xs) => {
      if (i % size === 0 && group.length) {
        return {
          groups: [...groups, group],
          group: [x],
        };
      } else {
        return {
          groups,
          group: [...group, x],
        };
      }
    },
    { groups: [], group: [] },
  );

  groups.push(group);

  return groups;
}

export const printColors = (color: string, paletteColor: string) => {
  console.log('%c color', `background: ${color}; color: #000`);
  console.log('%c paletteColor', `background: ${paletteColor}; color: #000`);
};