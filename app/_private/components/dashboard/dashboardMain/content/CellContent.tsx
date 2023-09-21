import { Chip } from '@nextui-org/react';
import React, { Key } from 'react';

// Utils
import { getStatusColor } from '@/_private/utils/pages';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';

export default function CellContent(
  {
    simulation, columnKey,
  }: {
    simulation: Simulation,
    columnKey: Key
  },
) {
  switch (columnKey) {
    case 'Title': return (<div>{simulation.form.title}</div>);
    case 'Sub-jobs number': return (<div>{simulation.form.subjobs}</div>);
    case 'Local status': return (
      <Chip variant="flat" color={getStatusColor(simulation.scripts.localRunWorkflow.scriptStatus)}>
        {simulation.scripts.localRunWorkflow.scriptStatus}
      </Chip>
    );
    case 'WLCG status': return (
      <Chip variant="flat" color={getStatusColor(simulation.scripts.gridRunWorkflow.scriptStatus)}>
        {simulation.scripts.gridRunWorkflow.scriptStatus}
      </Chip>
    );
    case 'Creation date': return (<div>{simulation.date}</div>);
    default: return null;
  }
}
