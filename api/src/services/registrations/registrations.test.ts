import type { Registration } from '@prisma/client';

import { registrations, registration, createRegistration, updateRegistration, deleteRegistration } from './registrations';
import type { StandardScenario } from './registrations.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('registrations', () => {
	scenario('returns all registrations', async (scenario: StandardScenario) => {
		const result = await registrations();

		expect(result.length).toEqual(Object.keys(scenario.registration).length);
	});

	scenario('returns a single registration', async (scenario: StandardScenario) => {
		const result = await registration({ id: scenario.registration.one.id });

		expect(result).toEqual(scenario.registration.one);
	});

	scenario('creates a registration', async (scenario: StandardScenario) => {
		const result = await createRegistration({
			input: { personId: scenario.registration.two.personId }
		});

		expect(result.personId).toEqual(scenario.registration.two.personId);
	});

	scenario('updates a registration', async (scenario: StandardScenario) => {
		const original = (await registration({ id: scenario.registration.one.id })) as Registration;
		const result = await updateRegistration({
			id: original.id,
			input: { personId: scenario.registration.two.personId }
		});

		expect(result.personId).toEqual(scenario.registration.two.personId);
	});

	scenario('deletes a registration', async (scenario: StandardScenario) => {
		const original = (await deleteRegistration({ id: scenario.registration.one.id })) as Registration;
		const result = await registration({ id: original.id });

		expect(result).toEqual(null);
	});
});
