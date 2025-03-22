export const schema = gql`
	"""
	Representation of Payment.
	"""
	type Payment {
		"Description for id."
		id: Int!

		"Description for date."
		date: DateTime!

		"Description for person."
		person: Person!

		"Description for personId."
		personId: Int!

		"Description for registration."
		registration: Registration!

		"Description for registrationId."
		registrationId: Int!

		"Description for amount."
		amount: Int!

		"Description for type."
		type: PaymentMethod!
	}

	"""
	Possible values for PaymentMethod
	"""
	enum PaymentMethod {
		CASH
		CARD
	}

	"""
	About queries
	"""
	type Query {
		"Fetch Payments."
		payments: [Payment!]! @requireAuth

		"Fetch a Payment by id."
		payment(id: Int!): Payment @requireAuth
	}

	"""
	Autogenerated input type of InputPayment.
	"""
	input CreatePaymentInput {
		"Description for date."
		date: DateTime!

		"Description for personId."
		personId: Int!

		"Description for registrationId."
		registrationId: Int!

		"Description for amount."
		amount: Int!

		"Description for type."
		type: PaymentMethod!
	}

	"""
	Autogenerated input type of UpdatePayment.
	"""
	input UpdatePaymentInput {
		"Description for date."
		date: DateTime

		"Description for personId."
		personId: Int

		"Description for registrationId."
		registrationId: Int

		"Description for amount."
		amount: Int

		"Description for type."
		type: PaymentMethod
	}

	"""
	About mutations
	"""
	type Mutation {
		"Creates a new Payment."
		createPayment(input: CreatePaymentInput!): Payment! @requireAuth

		"Updates an existing Payment."
		updatePayment(id: Int!, input: UpdatePaymentInput!): Payment! @requireAuth

		"Deletes an existing Payment."
		deletePayment(id: Int!): Payment! @requireAuth
	}
`;
