'use client';

import React, {
  useEffect, useMemo, useReducer,
} from 'react';

// Components
import Monitor from '@/components/timeline/Timeline';
import Run from '@/components/details/Details';
import Build from '@/components/form/Form';

// Types
import {
  DashboardUseReducer, FormUseReducer, Metadata, TableUseReducer,
} from '@/types/lib';

// Constants
import INITIAL_FORM from '@/lib/state/constants/form';
import { INITIAL_TABLE } from '@/lib/state/constants/table';

// Reducers
import metadataReducer from '@/lib/state/reducers/metadata';
import formReducer from '@/lib/state/reducers/form';
import tableReducer from '@/lib/state/reducers/table';

// Actions
import metadataActionCreators from '@/lib/state/actions/metadata';

export default function Dashboard() {
  const [allMetadata, dispatchMetadata]: DashboardUseReducer = useReducer(metadataReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(formReducer, INITIAL_FORM);
  const [table, dispatchTable]: TableUseReducer = useReducer(tableReducer, INITIAL_TABLE);

  const selectedMetadata: Metadata | null = useMemo(() => ((!table.selectedKey.has(''))
    ? allMetadata.find(
      (metadata: Metadata): boolean => (table.selectedKey.has(metadata.id)),
    ) || null
    : null), [table.selectedKey, allMetadata]);

  useEffect(() => {
    metadataActionCreators.readAllMetadata(dispatchMetadata);
    // @develop, when unmounting set pending simulations to rejected
  }, []);

  return (
    <div className="flex flex-nowrap justify-center">
      <div className="basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
        {selectedMetadata ? (
          <Run
            selectedMetadata={selectedMetadata}
            dispatchForm={dispatchForm}
            dispatchMetadata={dispatchMetadata}
            dispatchTable={dispatchTable}
          />
        ) : (
          <Build
            form={form}
            dispatchForm={dispatchForm}
            dispatchMetadata={dispatchMetadata}
          />
        )}
      </div>
      <div className="basis-2/4 h-screen overflow-x-hidden overflow-y-auto border-l border-l-neutral-400">
        <Monitor
          allMetadata={allMetadata}
          table={table}
          dispatchTable={dispatchTable}
        />
      </div>
    </div>
  );
}
