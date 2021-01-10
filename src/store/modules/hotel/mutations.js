import { MUTATORS } from "./const";

export const mutations = {
  [MUTATORS.SET_CITIES]: (state, payload) => {
    state.cities = payload;
  },
  [MUTATORS.SET_ROOM_TYPES]: (state, payload) => {
    state.roomTypes = payload;
  },
  [MUTATORS.SET_BASE_QUERY]: (state, payload) => {
    state.baseQuery = payload;
  },
  [MUTATORS.SET_FILTER_QUERY]: (state, payload) => {
    state.filterQuery = payload;
  },
  [MUTATORS.SET_HOTELS]: (state, payload) => {
    state.hotels = payload;
  },
  [MUTATORS.SET_HOTEL]: (state, payload) => {
    state.hotel = payload;
  },
  [MUTATORS.SET_BOOKING_DETAIL]: (state, payload) => {
    state.bookingDetail = payload;
  }
};
