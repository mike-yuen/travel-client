import { GETTERS } from "./const";

export const getters = {
  [GETTERS.GET_CITIES]: (state) => {
    return state.cities;
  },
  [GETTERS.GET_ROOM_TYPES]: (state) => {
    return state.roomTypes;
  },
  [GETTERS.GET_BASE_QUERY]: (state) => {
    return state.baseQuery;
  },
  [GETTERS.GET_DEFAULT_FILTER_QUERY]: (state) => {
    return state.defaultFilterQuery;
  },
  [GETTERS.GET_FILTER_QUERY]: (state) => {
    return state.filterQuery;
  },
  [GETTERS.GET_HOTELS]: (state) => {
    return state.hotels;
  },
  [GETTERS.GET_HOTEL]: (state) => {
    return state.hotel;
  },
  [GETTERS.GET_BOOKING_DETAIL]: (state) => {
    return state.bookingDetail;
  }
};
