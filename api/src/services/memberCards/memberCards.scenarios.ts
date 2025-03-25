import type { Prisma, MemberCard } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.MemberCardCreateArgs>({
	memberCard: {
		one: {
			data: {
				cardnumber: '2191477KZF4',
				expiry: '2025-03-25T19:51:35.984Z',
				section: 'GR-KOZA-TEI',
				person: { create: { firstname: 'First', lastname: 'Person', email: 'String', phone: 'String' } }
			}
		},
		two: {
			data: {
				cardnumber: '2005477KZF6',
				expiry: '2025-03-25T19:51:36.004Z',
				section: 'GR-THES-TEI',
				person: { create: { firstname: 'Last', lastname: 'Person', email: 'String', phone: 'String' } }
			}
		}
	}
});

export type StandardScenario = ScenarioData<MemberCard, 'memberCard'>;
