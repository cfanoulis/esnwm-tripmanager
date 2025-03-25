import type { Prisma, Payment } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.PaymentCreateArgs>({
	payment: {
		one: {
			data: {
				amount: 1295838,
				type: 'CASH',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } },
				registration: { create: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } } } }
			}
		},
		two: {
			data: {
				amount: 6629105,
				type: 'CASH',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } },
				registration: { create: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } } } }
			}
		}
	}
});

export type StandardScenario = ScenarioData<Payment, 'payment'>;
