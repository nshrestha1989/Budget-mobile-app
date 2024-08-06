
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    accounts: [
      {
        id: '1',
        type: 'Cash',
        total: '$300'
      },
      {
        id: '2',
        type: 'Commbank',
        total: '$300'
      },
      {
        id: '3',
        type: 'ANZ',
        total: '$300'
      },
    ]
  },
  getters: {
    accounts({ state }) {
      return state.accounts;
    }
  },
  actions: {
    addAccount({ state }, account) {
      state.accounts = [...state.accounts, account];
    },
  },
})
export default store;
