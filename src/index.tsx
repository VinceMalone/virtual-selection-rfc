import * as React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { PaginationProvider } from './pagination';
import { SelectionProvider } from './selection';
import './styles.css';
import { createList } from './utils';

const [LIST_SIZE, PAGE_SIZE] = [17, 5];
const MASTER_LIST = createList(LIST_SIZE);

render(
  <PaginationProvider pageSize={PAGE_SIZE} source={MASTER_LIST}>
    <SelectionProvider totalSize={MASTER_LIST.length}>
      <App />
    </SelectionProvider>
  </PaginationProvider>,
  document.getElementById('root'),
);
