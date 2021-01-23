/* STATE - START */

export const STATE = {
  cities: [],
  roomTypes: [],
  baseQuery: {
    cityId: "",
    date: [],
    guestCount: {
      adults: 2,
      children: 0,
      infants: 0
    }
  },
  defaultFilterQuery: {
    priceFrom: 0,
    priceTo: 200,
    roomTypeIds: [],
    rating: 0,
    pageSize: 10,
    pageIndex: 1,
    sort: ""
  },
  filterQuery: {
    priceFrom: 0,
    priceTo: 200,
    roomTypeIds: [],
    rating: 0,
    pageSize: 10,
    pageIndex: 1,
    sort: ""
  },
  hotels: [],
  hotel: {},
  bookingDetail: {},
  payment: {
    bookingId: "",
    clientSecret: "",
    paymentIntentId: ""
  }
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
  GET_HOTEL: "GET_HOTEL",
  GET_BOOKING_DETAIL: "GET_BOOKING_DETAIL",
  GET_PAYMENT: "GET_PAYMENT"
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
  GET_HOTEL: "GET_HOTEL",
  GET_BOOKING_DETAIL: "GET_BOOKING_DETAIL",
  BOOKING: "BOOKING",
  CONFIRM_BOOKING: "CONFIRM_BOOKING"
};
/* ACTIONS - END */

/* MUTATIONS - START */
export const MUTATORS = {
  SET_CITIES: "SET_CITIES",
  SET_ROOM_TYPES: "SET_ROOM_TYPES",
  SET_BASE_QUERY: "SET_BASE_QUERY",
  SET_FILTER_QUERY: "SET_FILTER_QUERY",
  SET_HOTELS: "SET_HOTELS",
  SET_HOTEL: "SET_HOTEL",
  SET_BOOKING_DETAIL: "SET_BOOKING_DETAIL",
  SET_PAYMENT: "SET_PAYMENT"
};
/* MUTATIONS - END */
