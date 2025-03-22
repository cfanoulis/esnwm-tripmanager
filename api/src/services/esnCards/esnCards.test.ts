import type { ESNCard } from '@prisma/client';

import { esnCards, esnCard, createEsnCard, updateEsnCard, deleteEsnCard } from './esnCards';
import type { StandardScenario } from './esnCards.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('esnCards', () => {
	scenario('returns all esnCards', async (scenario: StandardScenario) => {
		const result = await esnCards();

		expect(result.length).toEqual(Object.keys(scenario.esnCard).length);
	});

	scenario('returns a single esnCard', async (scenario: StandardScenario) => {
		const result = await esnCard({ cardnumber: scenario.esnCard.one.cardnumber });

		expect(result).toEqual(scenario.esnCard.one);
	});

	scenario('creates a esnCard', async (scenario: StandardScenario) => {
		const result = await createEsnCard({
			input: { cardnumber: 'String', expiry: '2025-03-22T14:21:10.332Z', section: 'String', personId: scenario.esnCard.two.personId }
		});

		expect(result.cardnumber).toEqual('String');
		expect(result.expiry).toEqual(new Date('2025-03-22T14:21:10.332Z'));
		expect(result.section).toEqual('String');
		expect(result.personId).toEqual(scenario.esnCard.two.personId);
	});

	scenario('updates a esnCard', async (scenario: StandardScenario) => {
		const original = (await esnCard({ cardnumber: scenario.esnCard.one.cardnumber })) as ESNCard;
		const result = await updateEsnCard({
			cardnumber: original.cardnumber,
			input: { cardnumber: 'String2' }
		});

		expect(result.cardnumber).toEqual('String2');
	});

	scenario('deletes a esnCard', async (scenario: StandardScenario) => {
		const original = (await deleteEsnCard({ cardnumber: scenario.esnCard.one.cardnumber })) as ESNCard;
		const result = await esnCard({ cardnumber: original.cardnumber });

		expect(result).toEqual(null);
	});
});
