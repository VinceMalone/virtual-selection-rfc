export const createItem = id => ({ id });

export const createList = size =>
  Array(size)
    .fill(null)
    .map((_, index) => createItem(index + 1));
