'use client';

import React, { useEffect, useReducer, useState } from 'react';

// Components
import Monitor from '@/components/dashboard/monitor/Monitor';
import Run from '@/components/dashboard/run/Run';

// Types
import {
  DashboardUseReducer, HandleCreateMetadata, HandleUpdateMetadata, Metadata,
} from '@/types/dashboard';

// Lib
import { getAllMetadata, postMetadata, putMetadata } from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';
import setStatus from '@/utils/setStatus';
import Build from '@/components/dashboard/build/Build';

// Constants
import INITIAL_FORM from '@/lib/constants/build';

// Reducers
import buildReducer from '@/lib/reducers/form';
import { BuildUseReducer } from '@/types/build';

export default function Page() {
  const [allMetadata, dispatchMetadata]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [selectedKey, setSelectedKey]: any = useState(new Set(['']));
  const [form, dispatchForm]: BuildUseReducer = useReducer(buildReducer, INITIAL_FORM);

  const handleUpdateMetadata: HandleUpdateMetadata = async (metadata) => {
    const unresolvedMetadata: Metadata = setStatus(metadata, 'PENDING');
    dispatchMetadata({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const resolvedMetadata: Metadata | null = await putMetadata(unresolvedMetadata);
    if (resolvedMetadata) dispatchMetadata({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  };

  const createMetadata: HandleCreateMetadata = async () => {
    const metadata: Metadata | null = await postMetadata(form);
    if (metadata) dispatchMetadata({ type: 'CREATE_METADATA', metadata });
  };

  useEffect(() => {
    const parsedResponse: Metadata[] | null = getAllMetadata();
    if (parsedResponse) dispatchMetadata({ type: 'READ_ALL_METADATA', parsedResponse });
  }, []);

  return (
    <div className="flex flex-nowrap">
      <div className="basis-1/4 flex-none h-screen border-r">
        <Build form={form} dispatchForm={dispatchForm} createMetadata={createMetadata} />
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
          selectedKey={selectedKey}
          handleUpdateMetadata={handleUpdateMetadata}
          dispatchForm={dispatchForm}
        />
      </div>
    </div>
  );
}
