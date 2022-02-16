// Get function for retrieving uri to call backend dependent on NODE_ENV
export const getBackendUri = () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return "";
  } else {
    return "http://localhost:3001"
  }
}