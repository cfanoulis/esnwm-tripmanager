import type { MemberCard } from '@prisma/client';

import { memberCards, memberCard, createMemberCard, updateMemberCard, deleteMemberCard } from './memberCards';
import type { StandardScenario } from './memberCards.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('memberCards', () => {
	scenario('returns all memberCards', async (scenario: StandardScenario) => {
		const result = await memberCards();

		expect(result.length).toEqual(Object.keys(scenario.memberCard).length);
	});

	scenario('returns a single memberCard', async (scenario: StandardScenario) => {
		const result = await memberCard({ cardnumber: scenario.memberCard.one.cardnumber });

		expect(result).toEqual(scenario.memberCard.one);
	});

	scenario('creates a memberCard', async (scenario: StandardScenario) => {
		const result = await createMemberCard({
			input: { cardnumber: 'String', expiry: '2025-03-25T19:51:35.782Z', section: 'String', personId: scenario.memberCard.two.personId }
		});

		expect(result.cardnumber).toEqual('String');
		expect(result.expiry).toEqual(new Date('2025-03-25T19:51:35.782Z'));
		expect(result.section).toEqual('String');
		expect(result.personId).toEqual(scenario.memberCard.two.personId);
	});

	scenario('updates a memberCard', async (scenario: StandardScenario) => {
		const original = (await memberCard({ cardnumber: scenario.memberCard.one.cardnumber })) as MemberCard;
		const result = await updateMemberCard({
			cardnumber: original.cardnumber,
			input: { cardnumber: 'String2' }
		});

		expect(result.cardnumber).toEqual('String2');
	});

	scenario('deletes a memberCard', async (scenario: StandardScenario) => {
		const original = (await deleteMemberCard({ cardnumber: scenario.memberCard.one.cardnumber })) as MemberCard;
		const result = await memberCard({ cardnumber: original.cardnumber });

		expect(result).toEqual(null);
	});
});
