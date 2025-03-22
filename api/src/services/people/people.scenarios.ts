import type { Prisma, Person } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.PersonCreateArgs>({
	person: {
		one: { data: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } },
		two: { data: { firstname: 'String', lastname: 'String', email: 'String', phone: 'String' } }
	}
});

export type StandardScenario = ScenarioData<Person, 'person'>;
