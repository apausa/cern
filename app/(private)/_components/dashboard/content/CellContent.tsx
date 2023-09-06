import { Chip } from '@nextui-org/react';
import React from 'react';

// Utils
import { getStatusColor, getStatusName } from '@/(private)/_utils/getStatus';

// Types
import { CellProps } from '@/(private)/_types/components/tableTypes';

// @develop, status name might not auto-update
export default function CellContent({ simulation, column }: CellProps) {
  switch (column) {
    case 'Title': return (simulation.form.title);
    case 'Number': return (1);
    case 'Local status': return (
      <Chip variant="flat" color={getStatusColor(simulation.testScript.scriptStatus)}>
        {getStatusName(simulation.testScript.scriptStatus)}
      </Chip>
    );
    case 'WLCG status': return (
      <Chip variant="flat" color={getStatusColor(simulation.gridScript.scriptStatus)}>
        {getStatusName(simulation.gridScript.scriptStatus)}
      </Chip>
    );
    case 'Date': return (simulation.date);
    default: return null;
  }
}
