const initialState = {
  user: null,
};

const SET_USER = "SET_USER";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { user: payload };
    default:
      return state;
  }
}
