import type { Prisma, ESNCard } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ESNCardCreateArgs>({
	esnCard: {
		one: {
			data: {
				cardnumber: 'String',
				expiry: '2025-03-22T14:21:10.538Z',
				section: 'String',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } }
			}
		},
		two: {
			data: {
				cardnumber: 'String',
				expiry: '2025-03-22T14:21:10.559Z',
				section: 'String',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } }
			}
		}
	}
});

export type StandardScenario = ScenarioData<ESNCard, 'esnCard'>;
