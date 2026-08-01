export const startPolling = (symbol) => {
  return {
    type: "START_POLLING",
    payload: symbol,
  };
};

export const stopPolling = () => {
  return {
    type: "STOP_POLLING",
    payload: null,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};
