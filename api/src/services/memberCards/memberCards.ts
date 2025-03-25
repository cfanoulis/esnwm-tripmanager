import type { ESNCardServicesResponse } from 'types/esn';
import type { QueryResolvers, MutationResolvers, MemberCardRelationResolvers } from 'types/graphql';

import { validate } from '@redwoodjs/api';

import { db } from 'src/lib/db';

export const ESNCARD_NUMBER = /^[0-9]{6}[a-z]{4}/gim;

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
			pattern: ESNCARD_NUMBER,
			message: "Invalid ESNCard number provided. Please make sure you don't include hyphens!"
		}
	});

	const [carddata] = (await fetch(`https://esncard.org/services/1.0/card.json?code=${input.cardnumber}`).then(async (r) => {
		if (!r.ok) throw `ESNCard services API returned a non-ok response: ${await r.text()}`;
		r.json();
	})) as ESNCardServicesResponse[];

	if (!carddata) throw `No ESNCard found with this card number.`;

	return db.memberCard.create({
		data: {
			cardnumber: carddata.code,
			expiry: new Date(carddata['expiration-date']),
			section: carddata['section-code'],
			person: {
				connect: { id: input.personId }
			}
		}
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
