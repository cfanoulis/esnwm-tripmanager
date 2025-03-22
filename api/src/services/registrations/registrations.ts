import type { QueryResolvers, MutationResolvers, RegistrationRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const registrations: QueryResolvers['registrations'] = () => {
	return db.registration.findMany();
};

export const registration: QueryResolvers['registration'] = ({ id }) => {
	return db.registration.findUnique({
		where: { id }
	});
};

export const createRegistration: MutationResolvers['createRegistration'] = ({ input }) => {
	return db.registration.create({
		data: input
	});
};

export const updateRegistration: MutationResolvers['updateRegistration'] = ({ id, input }) => {
	return db.registration.update({
		data: input,
		where: { id }
	});
};

export const deleteRegistration: MutationResolvers['deleteRegistration'] = ({ id }) => {
	return db.registration.delete({
		where: { id }
	});
};

export const Registration: RegistrationRelationResolvers = {
	person: (_obj, { root }) => {
		return db.registration.findUnique({ where: { id: root?.id } }).person();
	},
	payments: (_obj, { root }) => {
		return db.registration.findUnique({ where: { id: root?.id } }).payments();
	}
};
