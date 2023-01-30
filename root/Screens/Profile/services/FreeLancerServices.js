import axios from "../../../http/axiosSet";

export const getFreelancers = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MyZjA2MGJhZGJiNDAwMWY3OWE0YmMiLCJyb2xlIjoiRnJlZWxhbmNlciIsImVtYWlsIjoiYWJkdWxsYWhAZ21haWwuY29tIiwiaWF0IjoxNjc0NTg3MzUyfQ.HVTkY7gBEhgZAlRTEbOqx7-FItyg0Mqsdu8OhMCkr8Y";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.get("/freelancer/all", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
// startup details
export const getStartupDetails = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MyZjA3ZjdlNmQ3MDMzNGNkYWMyZDEiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWxjb20iLCJpYXQiOjE2NzQ4MzM3ODR9.hOYTBCiC1ekH76DWdhnXdcLcl5UYISDQezERIE80iiA";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/getStarupbyId",
      { startupid: "63c472daa119a436b059bb72" },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Team Roles
export const Role = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MyZjA3ZjdlNmQ3MDMzNGNkYWMyZDEiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWxjb20iLCJpYXQiOjE2NzQ4MzM3ODR9.hOYTBCiC1ekH76DWdhnXdcLcl5UYISDQezERIE80iiA";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/getstartupRoles",
      { startupid: "63c472daa119a436b059bb72" },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
