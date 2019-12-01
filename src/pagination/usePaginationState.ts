import { useCallback, useMemo, useState } from 'react';

export const usePaginationState = <T>(source: T[], pageSize: number) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const list = useMemo(() => {
    const offset = (currentPageNumber - 1) * pageSize;
    return source.slice(offset, offset + pageSize);
  }, [currentPageNumber, pageSize, source]);

  const lastPageNumber = useMemo(() => Math.ceil(source.length / pageSize), [
    pageSize,
    source.length,
  ]);

  const goToNextPage = useCallback(
    () => setCurrentPageNumber(n => Math.min(n + 1, lastPageNumber)),
    [lastPageNumber],
  );

  const goToPreviousPage = useCallback(
    () => setCurrentPageNumber(n => Math.max(1, n - 1)),
    [],
  );

  const hasNextPage = useMemo(() => currentPageNumber < lastPageNumber, [
    currentPageNumber,
    lastPageNumber,
  ]);

  const hasPreviousPage = useMemo(() => currentPageNumber > 1, [
    currentPageNumber,
  ]);

  return useMemo(
    () => ({
      currentPageNumber,
      goToNextPage,
      goToPreviousPage,
      hasNextPage,
      hasPreviousPage,
      list,
    }),
    [
      currentPageNumber,
      goToNextPage,
      goToPreviousPage,
      hasNextPage,
      hasPreviousPage,
      list,
    ],
  );
};
