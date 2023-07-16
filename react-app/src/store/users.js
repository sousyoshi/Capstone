const GET_ALL_USERS = "GET/allUsers";
const GET_ONE_USER = "GET/user";

const getOneUserAction = (user) => {
  return {
    type: GET_ONE_USER,
    user,
  };
};

const getAllUsersAction = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

export const getOneUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(getOneUserAction(user));
    return user;
  }
};

export const getAllUsersThunk = () => async (dispatch) => {
  const res = await fetch("/api/users");
  if (res.ok) {
    const {users} = await res.json();
    dispatch(getAllUsersAction(users));
    return users;
  }
};

const initState = {};
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_ONE_USER: {
      const newState = { ...state };
      newState[action.user.id] = action.user;
      return newState;
    }
    case GET_ALL_USERS: {
      const newState = { ...state };
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    }
    default:
      return state;
  }
}
