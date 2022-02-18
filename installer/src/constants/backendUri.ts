// Get function for retrieving uri to call backend dependent on NODE_ENV
export const getBackendUri = () => {
  if (process.env.NODE_ENV === "production") {
    return "";
  } else {
    return "http://localhost:3001"
  }
}