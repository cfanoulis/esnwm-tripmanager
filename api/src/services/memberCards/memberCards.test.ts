import type { MemberCard } from '@prisma/client';

import { ServiceValidationError } from '@redwoodjs/api';

import { memberCards, memberCard, createMemberCard, deleteMemberCard } from './memberCards';
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
			input: { cardnumber: '1900007BBSK', personId: scenario.memberCard.two.personId }
		});

		expect(result.cardnumber).toEqual('1900007BBSK');
		expect(result.expiry).toEqual(new Date('2024-11-26'));
		expect(result.section).toEqual('GR-KOZA-TEI');
		expect(result.personId).toEqual(scenario.memberCard.two.personId);
	});

	scenario('throws on invalid card numbers', async (scenario: StandardScenario) => {
		const fcn = async () => await createMemberCard({ input: { cardnumber: 'INVALIDIDBABY', personId: scenario.memberCard.two.personId } });
		expect(fcn).rejects.toThrow(ServiceValidationError);
	});

	scenario('throws on valid but non-existent numbers', async (scenario: StandardScenario) => {
		const fcn = async () => await createMemberCard({ input: { cardnumber: '0000007BBSk', personId: scenario.memberCard.two.personId } });
		expect(fcn).rejects.toThrow(ServiceValidationError);
	});

	//TODO: throw on expired cards

	scenario('deletes a memberCard', async (scenario: StandardScenario) => {
		const original = (await deleteMemberCard({ cardnumber: scenario.memberCard.one.cardnumber })) as MemberCard;
		const result = await memberCard({ cardnumber: original.cardnumber });

		expect(result).toEqual(null);
	});
});
