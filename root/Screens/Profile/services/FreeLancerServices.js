import axios from "../../../http/axiosSet";
//All Freelancers Get
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
//All Warnings post
export const getWarnings = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1NDI0NjAzfQ.OmebzO_GT9asjbRe8BufZOzkUdqE5DI-y5Zqhg3CzJU";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/getallwarnings",
      { startupid: "63d82eef251166001f1dceb4" },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
//All Startups Get
export const getStartups = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MjQ2ODg2fQ.fKcazFTrfGdIbx4s_s8wCx1uhbJizD49BlE-R5VmKIg";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.get("/startup/getallStartups", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
// startup details Post
export const getStartupDetails = async (id) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/getStarupbyId",
      { startupid: id },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Team Roles Post
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
      { startupid: "63d82eef251166001f1dceb4" },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Mile Stones Put
export const EditMileStones = async (startup, milestone, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.put(
      "/startup/updatemilestone",
      {
        startupid: startup,
        milestoneid: milestone,
        newMilestone: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Mile Stones Post
export const AddMileStones = async (startup, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/addmilestone",
      {
        startupid: startup,

        newMilestone: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Mile Stones Post Delete
export const DeleteMileStones = async (startup, milestone) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, milestoneid: milestone },
    };
    const resp = await axios.delete("/startup/removemilestone", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Team Roles Add Post
export const addRoles = async (startup, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/addProjectRole",
      {
        startupid: startup,

        newRole: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// role Post Delete
export const DeleteRoles = async (startup, role) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, roleid: role },
    };
    const resp = await axios.delete("/startup/deletestartupRoles", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
// role Put
export const EditRole = async (startup, role, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.put(
      "startup/updatestartupRoles",
      {
        startupid: startup,
        roleid: role,
        newRole: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Todo Add Post
export const AddTodo = async (startup, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/startup/addtodo",
      {
        startupid: startup,

        newTodo: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Todo  Delete
export const DeleteTodo = async (startup, role) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, todoid: role },
    };
    const resp = await axios.delete("/startup/deletetodo", config);
    return resp;
  } catch (error) {
    return error.response;
  }
};
// Task Put
export const EditTodo = async (startup, Task, data) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4Mjk2M2Q2MzlkOTAwMWUxOTllOGYiLCJyb2xlIjoiU3RhcnR1cCBPd25lciIsImVtYWlsIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjc1MTEwODA3fQ.8PbjThH_JcuOSBd2lL29mDExLSuSyiBEKGv0_HECJq8";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.put(
      "startup/updatetodo",
      {
        startupid: startup,
        todoid: Task,
        newTodo: data,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
