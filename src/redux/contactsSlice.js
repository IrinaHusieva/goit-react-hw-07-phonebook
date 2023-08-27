
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
}

const handlePending = (state) => {
	state.isLoading = true
	state.error = ''
}
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state) => {
	state.isLoading = false
}


const fetchAllContacts = (state, { payload }) => {
  state.isLoading = false
  state.items = payload.items
}

const addContactFulfilled = (state, { payload }) => {
  state.items.push(payload);
}

const deleteContactFulfilled = (state, { payload }) => {
	state.items = state.items.filter(contact => contact.id !== payload.id)
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, fetchAllContacts)
      .addCase(addContact.fulfilled, addContactFulfilled)
      .addCase(deleteContact.fulfilled, deleteContactFulfilled)
    .addMatcher(
				(action) => action.type.endsWith('/pending'),
				handlePending
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				handleRejected
			)
			.addMatcher(
				(action) => action.type.endsWith('/fulfilled'),
				handleFulfilled
			)
  }
});

export default contactsSlice.reducer;
export const { updateFilter } = contactsSlice.actions;