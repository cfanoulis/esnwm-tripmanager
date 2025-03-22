import type { QueryResolvers, MutationResolvers, EsnCardRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const esnCards: QueryResolvers['esnCards'] = () => {
	return db.esnCard.findMany();
};

export const esnCard: QueryResolvers['esnCard'] = ({ cardnumber }) => {
	return db.esnCard.findUnique({
		where: { cardnumber }
	});
};

export const createEsnCard: MutationResolvers['createEsnCard'] = ({ input }) => {
	return db.esnCard.create({
		data: input
	});
};

export const updateEsnCard: MutationResolvers['updateEsnCard'] = ({ cardnumber, input }) => {
	return db.esnCard.update({
		data: input,
		where: { cardnumber }
	});
};

export const deleteEsnCard: MutationResolvers['deleteEsnCard'] = ({ cardnumber }) => {
	return db.esnCard.delete({
		where: { cardnumber }
	});
};

export const EsnCard: EsnCardRelationResolvers = {
	person: (_obj, { root }) => {
		return db.esnCard.findUnique({ where: { cardnumber: root?.cardnumber } }).person();
	}
};
