const tableReducer = (
  table: any,
  action: any,
): any => {
  switch (action.type) {
    case 'UPDATE_SELECTED_KEY': return { ...table, selectedKey: action.key };
    case 'UPDATE_SELECTED_COLUMNS': return { ...table, selectedColumns: action.keys };

    // @develop
    case 'UPDATE_FILTER_VALUE': return table;
    case 'UPDATE_STATUS_FILTER': return table;
    case 'UPDATE_ROWS_PER_PAGE': return table;
    case 'UPDATE_SORT_DESCRIPTOR': return table;
    case 'UPDATE_PAGE': return table;
    default: return table;
  }
};

export default tableReducer;
