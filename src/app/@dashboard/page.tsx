/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { Button, Divider } from '@nextui-org/react';

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
      <div className="basis-194 flex-none h-screen border-r">
        <Build handleCreateMetadata={handleCreateMetadata} />
      </div>
      <div className="basis-128 flex-none h-screen border-r">
        <Run dashboardState={dashboardState} handleUpdateMetadata={handleUpdateMetadata} />
      </div>
      <div className="basis-128 flex-none h-screen border-r">
        <Monitor />
      </div>
    </div>
  );
}
