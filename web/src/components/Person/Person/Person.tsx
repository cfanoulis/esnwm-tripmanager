import type { DeletePersonMutation, DeletePersonMutationVariables, FindPersonById } from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import type { TypedDocumentNode } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { checkboxInputTag } from 'src/lib/formatters';

const DELETE_PERSON_MUTATION: TypedDocumentNode<DeletePersonMutation, DeletePersonMutationVariables> = gql`
	mutation DeletePersonMutation($id: Int!) {
		deletePerson(id: $id) {
			id
		}
	}
`;

interface Props {
	person: NonNullable<FindPersonById['person']>;
}

const Person = ({ person }: Props) => {
	const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
		onCompleted: () => {
			toast.success('Person deleted');
			navigate(routes.people());
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const onDeleteClick = (id: DeletePersonMutationVariables['id']) => {
		if (confirm('Are you sure you want to delete person ' + id + '?')) {
			deletePerson({ variables: { id } });
		}
	};

	return (
		<>
			<div className="rw-segment">
				<header className="rw-segment-header">
					<h2 className="rw-heading rw-heading-secondary">Person {person.id} Detail</h2>
				</header>
				<table className="rw-table">
					<tbody>
						<tr>
							<th>Id</th>
							<td>{person.id}</td>
						</tr>
						<tr>
							<th>Active</th>
							<td>{checkboxInputTag(person.active)}</td>
						</tr>
						<tr>
							<th>Firstname</th>
							<td>{person.firstname}</td>
						</tr>
						<tr>
							<th>Lastname</th>
							<td>{person.lastname}</td>
						</tr>
						<tr>
							<th>Email</th>
							<td>{person.email}</td>
						</tr>
						<tr>
							<th>Phone</th>
							<td>{person.phone}</td>
						</tr>
						<tr>
							<th>Notes</th>
							<td>{person.notes}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<nav className="rw-button-group">
				<Link to={routes.editPerson({ id: person.id })} className="rw-button rw-button-blue">
					Edit
				</Link>
				<button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(person.id)}>
					Delete
				</button>
			</nav>
		</>
	);
};

export default Person;
