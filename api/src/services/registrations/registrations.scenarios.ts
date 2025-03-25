import type { Prisma, Registration } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.RegistrationCreateArgs>({
	registration: {
		one: { data: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } } } },
		two: { data: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } } } }
	}
});

export type StandardScenario = ScenarioData<Registration, 'registration'>;
