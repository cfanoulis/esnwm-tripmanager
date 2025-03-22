import type { FindPeople, FindPeopleVariables } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps, TypedDocumentNode } from '@redwoodjs/web';

import People from 'src/components/Person/People';

export const QUERY: TypedDocumentNode<FindPeople, FindPeopleVariables> = gql`
	query FindPeople {
		people {
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

export const Empty = () => {
	return (
		<div className="rw-text-center">
			No people yet.{' '}
			<Link to={routes.newPerson()} className="rw-link">
				Create one?
			</Link>
		</div>
	);
};

export const Failure = ({ error }: CellFailureProps<FindPeople>) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ people }: CellSuccessProps<FindPeople, FindPeopleVariables>) => {
	return <People people={people} />;
};
