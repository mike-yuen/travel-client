/* STATE - START */

export const STATE = {
  cities: [],
  roomTypes: [],
  baseQuery: {
    cityId: "",
    date: [],
    guestCount: 0
  },
  defaultFilterQuery: {
    roomTypeIds: [],
    rating: 0,
    pageSize: 10,
    pageIndex: 1,
    sort: ""
  },
  filterQuery: {
    roomTypeIds: [],
    rating: 0,
    pageSize: 10,
    pageIndex: 1,
    sort: ""
  },
  hotels: [],
  hotel: {}
};
/* STATE - END */

/* GETTERS - START */
export const GETTERS = {
  GET_CITIES: "GET_CITIES",
  GET_ROOM_TYPES: "GET_ROOM_TYPES",
  GET_BASE_QUERY: "GET_BASE_QUERY",
  GET_DEFAULT_FILTER_QUERY: "GET_DEFAULT_FILTER_QUERY",
  GET_FILTER_QUERY: "GET_FILTER_QUERY",
  GET_HOTELS: "GET_HOTELS",
  GET_HOTEL: "GET_HOTEL"
};
/* GETTERS - END */

/* ACTIONS - START */
export const ACTIONS = {
  GET_CITIES: "GET_CITIES",
  GET_ROOM_TYPES: "GET_ROOM_TYPES",
  SET_BASE_QUERY: "SET_BASE_QUERY",
  SET_FILTER_QUERY: "SET_FILTER_QUERY",
  RESET_FILTER_QUERY: "RESET_FILTER_QUERY",
  GET_HOTELS: "GET_HOTELS",
  GET_HOTEL: "GET_HOTEL"
};
/* ACTIONS - END */

/* MUTATIONS - START */
export const MUTATORS = {
  SET_CITIES: "SET_CITIES",
  SET_ROOM_TYPES: "SET_ROOM_TYPES",
  SET_BASE_QUERY: "SET_BASE_QUERY",
  SET_FILTER_QUERY: "SET_FILTER_QUERY",
  SET_HOTELS: "SET_HOTELS",
  SET_HOTEL: "SET_HOTEL"
};
/* MUTATIONS - END */
