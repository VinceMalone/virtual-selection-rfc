import * as React from 'react';

import { AllControl } from './AllControl';
import { AllPageControl } from './AllPageControl';
import { Item } from './Item';
import { usePagination } from './pagination';
import { useSelection } from './selection';

export const App = () => {
  const pagination = usePagination();
  const { generateOutput } = useSelection();

  const pageIds = React.useMemo(() => pagination.list.map(({ id }) => id), [
    pagination.list,
  ]);

  const output = React.useMemo(
    () => JSON.stringify(generateOutput(), null, 2),
    [generateOutput],
  );

  return (
    <section className="container">
      <div className="pagination">
        <button
          disabled={!pagination.hasPreviousPage}
          onClick={pagination.goToPreviousPage}
          type="button"
        >
          Previous
        </button>
        <span title="Current page"> {pagination.currentPageNumber} </span>
        <button
          disabled={!pagination.hasNextPage}
          onClick={pagination.goToNextPage}
          type="button"
        >
          Next
        </button>
      </div>
      <div className="all">
        <AllControl>Select all</AllControl>
        <AllPageControl ids={pageIds}>Select all on page</AllPageControl>
      </div>
      <ul className="list">
        {pagination.list.map(({ id }) => (
          <li key={id.toString()}>
            <Item id={id} />
          </li>
        ))}
      </ul>
      <pre className="output">{output}</pre>
    </section>
  );
};
