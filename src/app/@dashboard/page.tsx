'use client';

import React, { useEffect, useReducer, useState } from 'react';

// Components
import Build from '@/components/dashboard/build/Build';
import Monitor from '@/components/dashboard/monitor/Monitor';
import Run from '@/components/dashboard/run/Run';

// Types
import {
  DashboardUseReducer, HandleCreateMetadata, HandleUpdateMetadata, Metadata,
} from '@/types/dashboard';

// Lib
import { postMetadata, putMetadata } from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';
import setStatus from '@/utils/setStatus';
import Dashboard from '@/components/dashboard/Dashboard';
import { Form } from '@/types/build';

export default function Page() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [openBuild, setBuild]: any = useState(false);

  const handleClick = (): void => { setBuild(!openBuild); };

  const updateMetadata: HandleUpdateMetadata = async (metadata) => {
    const unresolvedMetadata: Metadata = setStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });

    const resolvedMetadata: Metadata | null = await putMetadata(unresolvedMetadata);
    if (resolvedMetadata) dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
  };

  const createMetadata: HandleCreateMetadata = async (form: Form) => {
    const metadata: Metadata | null = await postMetadata(form);
    if (metadata) dispatch({ type: 'CREATE_METADATA', metadata });
  };

  useEffect(() => {
    const response: string = localStorage.getItem('allMetadata')!;
    const allMetadata: Metadata[] = JSON.parse(response);

    if (allMetadata) dispatch({ type: 'READ_ALL_METADATA', allMetadata });
  }, []);

  return (
    <div className="flex flex-nowrap">
      <div className="basis-64 flex-none h-screen border-r">
        <Dashboard openBuild={openBuild} handleClick={handleClick} />
      </div>
      {openBuild && (
      <div className="basis-128 flex-none h-screen border-r">
        <Build createMetadata={createMetadata} handleClick={handleClick} />
      </div>
      )}
      <div className="basis-128 flex-none h-screen border-r">
        <Run dashboardState={dashboardState} updateMetadata={updateMetadata} />
      </div>
      <div className="basis-128 flex-none h-screen border-r">
        <Monitor />
      </div>
    </div>
  );
}
