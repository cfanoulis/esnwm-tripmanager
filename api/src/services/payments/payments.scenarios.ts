import type { Prisma, Payment } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.PaymentCreateArgs>({
	payment: {
		one: {
			data: {
				amount: 4193432,
				type: 'CASH',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } },
				registration: {
					create: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } } }
				}
			}
		},
		two: {
			data: {
				amount: 1495105,
				type: 'CASH',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } },
				registration: {
					create: { person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String', notes: 'String' } } }
				}
			}
		}
	}
});

export type StandardScenario = ScenarioData<Payment, 'payment'>;
