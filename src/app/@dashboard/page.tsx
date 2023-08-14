/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useReducer, useState } from 'react';

// Components
import Build from '@/components/dashboard/build/Build';
import Monitor from '@/components/dashboard/monitor/Monitor';
import Run from '@/components/dashboard/run/Run';

// Types
import {
  DashboardUseReducer, HandleCreateSimulation, HandleUpdateSimulation, Simulation,
} from '@/types/dashboard';

// Utils
import setPending from '@/utils/setPending';

// Lib
import { postSimulation, putSimulation } from '@/lib/services/dashboard';
import dashboardReducer from '@/lib/reducers/dashboard';

export default function Page() {
  const [dashboardState, dispatch]: DashboardUseReducer = useReducer(dashboardReducer, []);
  const [build, setBuild]: any = useState(false);

  const handleClick = () => {
    setBuild(true);
  };

  const handleUpdateSimulation: HandleUpdateSimulation = async (simulation) => {
    const unresolvedSimulation: Simulation = setPending(simulation);
    dispatch({ type: 'UPDATE_SIMULATION', simulation: unresolvedSimulation });

    const resolvedSimulation: Simulation = await putSimulation(unresolvedSimulation);
    dispatch({ type: 'UPDATE_SIMULATION', simulation: resolvedSimulation });
  };

  const handleCreateSimulation: HandleCreateSimulation = async (parsedO2Cmd) => {
    const createdSimulation: Simulation = await postSimulation(parsedO2Cmd);
    dispatch({ type: 'CREATE_SIMULATION', simulation: createdSimulation });

    handleUpdateSimulation(createdSimulation);
  };

  return (
    <main className="flex flex-nowrap">
      <div className="flex-none basis-1/4 h-screen border-r-2">
        <div className="font-bold">Dashboard</div>
        <br />
        <input
          type="button"
          onClick={handleClick}
          value="Build script"
        />
      </div>
      {build && (
      <div className="flex-none basis-2/4 h-screen border-r-2">
        <Build
          handleCreateSimulation={handleCreateSimulation}
        />
      </div>
      )}
      <div className="flex-none basis-1/3 h-screen border-r-2">
        <Run
          dashboardState={dashboardState}
          handleUpdateSimulation={handleUpdateSimulation}
        />
      </div>
      <div className="flex-none basis-1/3 h-screen border-r-2">
        <Monitor />
      </div>
    </main>
  );
}
