export const schema = gql`
	"""
	Representation of Person.
	"""
	type Person {
		"Description for id."
		id: Int!

		"Description for active."
		active: Boolean!

		"Description for registrations."
		registrations: [Registration]!

		"Description for payments."
		payments: [Payment]!

		"Description for esncard."
		esncard: [MemberCard]!

		"Description for firstname."
		firstname: String!

		"Description for lastname."
		lastname: String!

		"Description for email."
		email: String!

		"Description for phone."
		phone: String!

		"Description for notes."
		notes: String
	}

	"""
	About queries
	"""
	type Query {
		"Fetch People."
		people: [Person!]! @requireAuth

		"Fetch a Person by id."
		person(id: Int!): Person @requireAuth
	}

	"""
	Autogenerated input type of InputPerson.
	"""
	input CreatePersonInput {
		"Description for active."
		active: Boolean!

		"Description for firstname."
		firstname: String!

		"Description for lastname."
		lastname: String!

		"Description for email."
		email: String!

		"Description for phone."
		phone: String!

		"Description for notes."
		notes: String
	}

	"""
	Autogenerated input type of UpdatePerson.
	"""
	input UpdatePersonInput {
		"Description for active."
		active: Boolean

		"Description for firstname."
		firstname: String

		"Description for lastname."
		lastname: String

		"Description for email."
		email: String

		"Description for phone."
		phone: String

		"Description for notes."
		notes: String
	}

	"""
	About mutations
	"""
	type Mutation {
		"Creates a new Person."
		createPerson(input: CreatePersonInput!): Person! @requireAuth

		"Updates an existing Person."
		updatePerson(id: Int!, input: UpdatePersonInput!): Person! @requireAuth

		"Deletes an existing Person."
		deletePerson(id: Int!): Person! @requireAuth
	}
`;
