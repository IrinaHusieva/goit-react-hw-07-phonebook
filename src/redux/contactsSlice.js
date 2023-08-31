
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
  state.contacts.isLoading = true;
  state.contacts.error = '';
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const handleFulfilled = (state) => {
  state.contacts.isLoading = false;
};



const fetchAllContacts = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.items = payload;
}

const addContactFulfilled = (state, { payload }) => {
  state.contacts.items.push(payload);
}

const deleteContactFulfilled = (state, { payload }) => {
  state.contacts.items = state.contacts.items.filter(contact => contact.id !== payload);
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