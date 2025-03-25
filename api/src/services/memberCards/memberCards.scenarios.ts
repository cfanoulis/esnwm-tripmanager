import type { Prisma, MemberCard } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.MemberCardCreateArgs>({
	memberCard: {
		one: {
			data: {
				cardnumber: 'String',
				expiry: '2025-03-25T19:51:35.984Z',
				section: 'String',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } }
			}
		},
		two: {
			data: {
				cardnumber: 'String',
				expiry: '2025-03-25T19:51:36.004Z',
				section: 'String',
				person: { create: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } }
			}
		}
	}
});

export type StandardScenario = ScenarioData<MemberCard, 'memberCard'>;
