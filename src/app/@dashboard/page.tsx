/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useEffect, useReducer, useState } from 'react';

// Components
import Build from '@/components/dashboard/build/Build';
import Monitor from '@/components/dashboard/monitor/Monitor';
import Run from '@/components/dashboard/run/Run';

// Types
import {
  DashboardUseReducer, HandleAllMetadata, HandleCreateMetadata, HandleUpdateMetadata, Metadata,
} from '@/types/dashboard';

// Lib
import {
  getAllMetadata, postMetadata, putMetadata,
} from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';
import setStatus from '@/utils/setStatus';

export default function Page() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [build, setBuild]: any = useState(false);

  const handleClick = () => {
    if (!build) setBuild(true);
  };

  const handleUpdateMetadata: HandleUpdateMetadata = async (metadata) => {
    const unresolvedMetadata: Metadata = setStatus(metadata, 'PENDING');
    dispatch({ type: 'UPDATE_METADATA', metadata: unresolvedMetadata });
    localStorage.setItem('allMetadata', JSON.stringify(dashboardState)); // @delete

    const resolvedMetadata: Metadata | null = await putMetadata(unresolvedMetadata);
    if (resolvedMetadata) {
      dispatch({ type: 'UPDATE_METADATA', metadata: resolvedMetadata });
      localStorage.setItem('allMetadata', JSON.stringify(dashboardState)); // @delete
    }
  };

  const handleCreateMetadata: HandleCreateMetadata = async (version, o2CmdStr) => {
    const metadata: Metadata | null = await postMetadata(version, o2CmdStr);
    if (metadata) {
      dispatch({ type: 'CREATE_METADATA', metadata });
      localStorage.setItem('allMetadata', JSON.stringify(dashboardState)); // @delete
    }
  };

  const handleReadAllMetadata: HandleAllMetadata = () => {
    const allMetadata: Metadata[] = getAllMetadata();
    if (allMetadata) dispatch({ type: 'READ_ALL_METADATA', allMetadata });
  };

  useEffect(() => {
    handleReadAllMetadata();
  }, []);

  return (
    <div className="flex flex-nowrap">
      <div className="flex-none basis-1/6 h-screen border-r-2">
        <div className="font-bold">Dashboard</div>
        <br />
        <input
          type="button"
          onClick={handleClick}
          value="Build script"
        />
      </div>
      {build && (
      <div className="flex-none basis-1/3 h-screen border-r-2">
        <Build
          handleCreateMetadata={handleCreateMetadata}
          setBuild={setBuild}
        />
      </div>
      )}
      <div className="flex-none basis-1/3 h-screen border-r-2">
        <Run
          dashboardState={dashboardState}
          handleUpdateMetadata={handleUpdateMetadata}
        />
      </div>
      <div className="flex-none basis-1/3 h-screen border-r-2">
        <Monitor />
      </div>
    </div>
  );
}
