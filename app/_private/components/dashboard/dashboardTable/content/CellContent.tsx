import { Chip } from '@nextui-org/react';
import React from 'react';

// Utils
import { getStatusColor, getStatusName } from '@/_private/utils/getStatus';

// Types
import { CellProps } from '@/_private/types/components/tableTypes';

export default function CellContent({ simulation, column }: CellProps) {
  switch (column) {
    case 'Title': return (simulation.form.title);
    case 'Number': return (1);
    case 'Local status': return (
      <Chip variant="flat" color={getStatusColor(simulation.scripts.localRunWorkflow.scriptStatus)}>
        {getStatusName(simulation.scripts.localRunWorkflow.scriptStatus)}
      </Chip>
    );
    case 'WLCG status': return (
      <Chip variant="flat" color={getStatusColor(simulation.scripts.gridRunWorkflow.scriptStatus)}>
        {getStatusName(simulation.scripts.gridRunWorkflow.scriptStatus)}
      </Chip>
    );
    case 'Date': return (simulation.date);
    default: return null;
  }
}
