'use client';

import React, { useEffect, useReducer, useState } from 'react';

// Components
import Monitor from '@/components/monitor/Monitor';
import Run from '@/components/run/Run';

// Types
import { DashboardUseReducer, FormUseReducer } from '@/types/lib';

// Lib
import Build from '@/components/build/Build';

// Constants
import INITIAL_FORM from '@/lib/constants/form';

// Reducers
import dashboardReducer from '@/lib/reducers/metadata';
import buildReducer from '@/lib/reducers/form';

// Actions
import metadataActionCreators from '@/lib/actions/metadata';

export default function Dashboard() {
  const [allMetadata, dispatchMetadata]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(buildReducer, INITIAL_FORM);

  const [selectedMetadata, setSelectedMetadata]: any = useState(null);

  useEffect(() => {
    metadataActionCreators.readAllMetadata(dispatchMetadata);
  }, []);

  return (
    <div className="flex flex-nowrap justify-center">
      <div className="basis-1/4 h-screen overflow-x-hidden overflow-y-auto">
        {selectedMetadata ? (
          <Run
            selectedMetadata={selectedMetadata}
            setSelectedMetadata={setSelectedMetadata}
            dispatchForm={dispatchForm}
            dispatchMetadata={dispatchMetadata}
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
          selectedMetadata={selectedMetadata}
          setSelectedMetadata={setSelectedMetadata}
        />
      </div>
    </div>
  );
}
