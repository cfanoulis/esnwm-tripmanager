import type { CreatePersonMutation, CreatePersonInput, CreatePersonMutationVariables } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import type { TypedDocumentNode } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import PersonForm from 'src/components/Person/PersonForm';

const CREATE_PERSON_MUTATION: TypedDocumentNode<CreatePersonMutation, CreatePersonMutationVariables> = gql`
	mutation CreatePersonMutation($input: CreatePersonInput!) {
		createPerson(input: $input) {
			id
		}
	}
`;

const NewPerson = () => {
	const [createPerson, { loading, error }] = useMutation(CREATE_PERSON_MUTATION, {
		onCompleted: () => {
			toast.success('Person created');
			navigate(routes.people());
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const onSave = (input: CreatePersonInput) => {
		createPerson({ variables: { input } });
	};

	return (
		<div className="rw-segment">
			<header className="rw-segment-header">
				<h2 className="rw-heading rw-heading-secondary">New Person</h2>
			</header>
			<div className="rw-segment-main">
				<PersonForm onSave={onSave} loading={loading} error={error} />
			</div>
		</div>
	);
};

export default NewPerson;
