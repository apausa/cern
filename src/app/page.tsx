'use client';

import React, {
  useEffect, useMemo, useReducer,
} from 'react';

// Components
import Timeline from '@/components/timeline/Timeline';
import Details from '@/components/details/Details';
import Form from '@/components/form/Form';

// Types
import {
  DashboardUseReducer, FormUseReducer, Metadata, TableUseReducer,
} from '@/types/lib';

// State
import INITIAL_FORM from '@/lib/state/constants/form';
import { INITIAL_TABLE } from '@/lib/state/constants/table';
import metadataReducer from '@/lib/state/reducers/metadata';
import formReducer from '@/lib/state/reducers/form';
import tableReducer from '@/lib/state/reducers/table';
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
  }, []);

  return (
    <div className="flex flex-nowrap justify-center">
      <div className="invisible basis-0 lg:visible lg:basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
        {selectedMetadata ? (
          <Details
            selectedMetadata={selectedMetadata}
            dispatchForm={dispatchForm}
            dispatchMetadata={dispatchMetadata}
            dispatchTable={dispatchTable}
          />
        ) : (
          <Form
            form={form}
            dispatchForm={dispatchForm}
            dispatchMetadata={dispatchMetadata}
          />
        )}
      </div>
      <div className="basis-full lg:basis-2/4 h-screen overflow-x-hidden overflow-y-auto lg:border-l lg:border-l-neutral-400">
        <Timeline
          allMetadata={allMetadata}
          table={table}
          dispatchTable={dispatchTable}
        />
      </div>
    </div>
  );
}
