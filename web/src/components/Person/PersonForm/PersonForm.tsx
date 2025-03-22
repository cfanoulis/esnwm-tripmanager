import type { EditPersonById, UpdatePersonInput } from 'types/graphql';

import type { RWGqlError } from '@redwoodjs/forms';
import { Form, FormError, FieldError, Label, CheckboxField, TextField, Submit } from '@redwoodjs/forms';

type FormPerson = NonNullable<EditPersonById['person']>;

interface PersonFormProps {
	person?: EditPersonById['person'];
	onSave: (data: UpdatePersonInput, id?: FormPerson['id']) => void;
	error: RWGqlError;
	loading: boolean;
}

const PersonForm = (props: PersonFormProps) => {
	const onSubmit = (data: FormPerson) => {
		props.onSave(data, props?.person?.id);
	};

	return (
		<div className="rw-form-wrapper">
			<Form<FormPerson> onSubmit={onSubmit} error={props.error}>
				<FormError
					error={props.error}
					wrapperClassName="rw-form-error-wrapper"
					titleClassName="rw-form-error-title"
					listClassName="rw-form-error-list"
				/>

				<Label name="active" className="rw-label" errorClassName="rw-label rw-label-error">
					Active
				</Label>

				<CheckboxField name="active" defaultChecked={props.person?.active} className="rw-input" errorClassName="rw-input rw-input-error" />

				<FieldError name="active" className="rw-field-error" />

				<Label name="firstname" className="rw-label" errorClassName="rw-label rw-label-error">
					Firstname
				</Label>

				<TextField
					name="firstname"
					defaultValue={props.person?.firstname}
					className="rw-input"
					errorClassName="rw-input rw-input-error"
					validation={{ required: true }}
				/>

				<FieldError name="firstname" className="rw-field-error" />

				<Label name="lastname" className="rw-label" errorClassName="rw-label rw-label-error">
					Lastname
				</Label>

				<TextField
					name="lastname"
					defaultValue={props.person?.lastname}
					className="rw-input"
					errorClassName="rw-input rw-input-error"
					validation={{ required: true }}
				/>

				<FieldError name="lastname" className="rw-field-error" />

				<Label name="email" className="rw-label" errorClassName="rw-label rw-label-error">
					Email
				</Label>

				<TextField
					name="email"
					defaultValue={props.person?.email}
					className="rw-input"
					errorClassName="rw-input rw-input-error"
					validation={{ required: true }}
				/>

				<FieldError name="email" className="rw-field-error" />

				<Label name="phone" className="rw-label" errorClassName="rw-label rw-label-error">
					Phone
				</Label>

				<TextField
					name="phone"
					defaultValue={props.person?.phone}
					className="rw-input"
					errorClassName="rw-input rw-input-error"
					validation={{ required: true }}
				/>

				<FieldError name="phone" className="rw-field-error" />

				<Label name="notes" className="rw-label" errorClassName="rw-label rw-label-error">
					Notes
				</Label>

				<TextField
					name="notes"
					defaultValue={props.person?.notes}
					className="rw-input"
					errorClassName="rw-input rw-input-error"
					validation={{ required: true }}
				/>

				<FieldError name="notes" className="rw-field-error" />

				<div className="rw-button-group">
					<Submit disabled={props.loading} className="rw-button rw-button-blue">
						Save
					</Submit>
				</div>
			</Form>
		</div>
	);
};

export default PersonForm;
