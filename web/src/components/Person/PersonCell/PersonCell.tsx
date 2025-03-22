import type { FindPersonById, FindPersonByIdVariables } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps, TypedDocumentNode } from '@redwoodjs/web';

import Person from 'src/components/Person/Person';

export const QUERY: TypedDocumentNode<FindPersonById, FindPersonByIdVariables> = gql`
	query FindPersonById($id: Int!) {
		person: person(id: $id) {
			id
			active
			firstname
			lastname
			email
			phone
			notes
		}
	}
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Person not found</div>;

export const Failure = ({ error }: CellFailureProps<FindPersonByIdVariables>) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ person }: CellSuccessProps<FindPersonById, FindPersonByIdVariables>) => {
	return <Person person={person} />;
};
