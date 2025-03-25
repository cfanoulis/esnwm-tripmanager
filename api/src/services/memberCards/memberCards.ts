import type { ESNCardServicesResponse } from 'types/esn';
import type { QueryResolvers, MutationResolvers, MemberCardRelationResolvers } from 'types/graphql';

import { ServiceValidationError, validate, validateUniqueness } from '@redwoodjs/api';

import { db } from 'src/lib/db';

export const ESNCARD_NUMBER_REGEX = /[0-9A-Z]{11}/gim;

export const memberCards: QueryResolvers['memberCards'] = () => {
	return db.memberCard.findMany();
};

export const memberCard: QueryResolvers['memberCard'] = ({ cardnumber }) => {
	return db.memberCard.findUnique({
		where: { cardnumber: cardnumber.toUpperCase() }
	});
};

export const createMemberCard: MutationResolvers['createMemberCard'] = async ({ input }) => {
	validate(input.cardnumber, 'ESNCard Number', {
		format: {
			pattern: ESNCARD_NUMBER_REGEX,
			message: 'Invalid ESNCard number'
		}
	});

	const res = await fetch(`https://esncard.org/services/1.0/card.json?code=${input.cardnumber}`);
	if (!res.ok) throw `ESNCard services API returned a non-ok response: ${await res.text()}`;

	const data = (await res.json()) as ESNCardServicesResponse;

	if (!data[0]) throw new ServiceValidationError(`No ESNCard found with this card number.`);
	const carddata = data[0]; //for some reason destructuring here breaks everything. todo: why?

	return validateUniqueness('memberCard', { cardnumber: input.cardnumber }, { message: 'ESNCard has already been registered.' }, (tx) => {
		return tx.memberCard.create({
			data: {
				cardnumber: carddata.code,
				expiry: new Date(carddata['expiration-date']),
				section: carddata['section-code'],
				person: {
					connect: { id: input.personId }
				}
			}
		});
	});
};

export const deleteMemberCard: MutationResolvers['deleteMemberCard'] = ({ cardnumber }) => {
	return db.memberCard.delete({
		where: { cardnumber: cardnumber.toUpperCase() }
	});
};

export const MemberCard: MemberCardRelationResolvers = {
	person: (_obj, { root }) => {
		return db.memberCard.findUnique({ where: { cardnumber: root?.cardnumber.toUpperCase() } }).person();
	}
};
