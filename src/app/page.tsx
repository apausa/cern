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
import metadataActionCreatros from '@/lib/actions/metadata';

export default function Dashboard() {
  const [allMetadata, dispatchMetadata]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [form, dispatchForm]: FormUseReducer = useReducer(buildReducer, INITIAL_FORM);
  const [selectedMetadata, setSelectedMetadata]: any = useState(null);

  useEffect(() => {
    metadataActionCreatros.readAllMetadata(dispatchMetadata);
  }, []);

  return (
    <div className="flex flex-nowrap">
      <div className="basis-1/4 flex-none h-screen border-r">
        <Build
          form={form}
          dispatchForm={dispatchForm}
          dispatchMetadata={dispatchMetadata}
        />
      </div>
      <div className="basis-1/2 flex-none h-screen border-r">
        <Monitor
          allMetadata={allMetadata}
          setSelectedMetadata={setSelectedMetadata}
        />
      </div>
      <div className="basis-1/4 flex-none h-screen border-r">
        <Run
          selectedMetadata={selectedMetadata}
          dispatchForm={dispatchForm}
          dispatchMetadata={dispatchMetadata}
        />
      </div>
    </div>
  );
}
