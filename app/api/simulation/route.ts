import { NextResponse } from 'next/server';

// Types
import { Form } from '@/_types/components/formTypes';
import { Simulation } from '@/_types/components/simulationTypes';
import { PostSimulation } from '@/_types/app/apiTypes';

// Other
import { createSimulation, createScript } from './(build)';

export async function POST(request: Request): Promise<PostSimulation> {
  try {
    const form: Form = await request.json();
    const createdSimulation: Simulation = await createSimulation(form);

    await createScript(createdSimulation.testScript);
    await createScript(createdSimulation.gridScript);

    return NextResponse.json(createdSimulation, { status: 200 });
  } catch { return NextResponse.json(null, { status: 500 }); }
}
