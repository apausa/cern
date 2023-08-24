'use client';

import React, { useEffect, useReducer, useState } from 'react';

// Components
import Monitor from '@/components/dashboard/monitor/Monitor';
import Run from '@/components/dashboard/run/Run';

// Types
import { DashboardUseReducer, Metadata } from '@/types/dashboard';

// Lib
import dashboardReducer from '@/lib/reducers/dashboard';
import Build from '@/components/dashboard/build/Build';

// Constants
import INITIAL_FORM from '@/lib/constants/build';

// Reducers
import buildReducer from '@/lib/reducers/form';
import { BuildUseReducer } from '@/types/build';
import metadataActions from '@/lib/actions/metadata';

export default function Page() {
  const [allMetadata, dispatchMetadata]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [form, dispatchForm]: BuildUseReducer = useReducer(buildReducer, INITIAL_FORM);
  const [selectedKey, setSelectedKey]: any = useState(new Set(['']));
  const [selectedMetadata, setSelectedMetadata]: any = useState(null);

  useEffect(() => {
    if (!selectedKey.has('') && allMetadata.length === 1) {
      setSelectedMetadata(
        allMetadata.find((metadata: Metadata): Metadata => (selectedKey.has(metadata.id))),
      );
    }
  }, [selectedKey]);

  useEffect(() => {
    metadataActions.readAllMetadata(dispatchMetadata);
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
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
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
