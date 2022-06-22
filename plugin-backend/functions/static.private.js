exports.getBasePath = () => {
  if (process.env.REACT_APP_BACKEND_URL.includes("localhost")) {
    return `http://${process.env.REACT_APP_BACKEND_URL}`;
  }
  return `https://${process.env.REACT_APP_BACKEND_URL}`;
};
