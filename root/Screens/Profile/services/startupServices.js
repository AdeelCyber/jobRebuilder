import axios from "../../../http/axiosSet";

export const step1startup = async (
  accessToken,
  businessName,
  problemstatement,
  impactstatement,
  competition,
  story,
  budget,
  value,
  location,
  getmediatype,
  getmedia,
  userimg
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/startup/saveOnboarding",
      {
        formStep: "1",
        businessName: businessName,
        problemStatement: problemstatement,
        impactStatement: impactstatement,
        competition: competition,
        story: story,
        budget: budget,
        category: value,
        location: location,
        promoMedia: {
          mediatype: getmediatype,
          url: getmedia,
        },
        logo: userimg,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const step2startup = async (accessToken, startupid, member) => {
  console.log(startupid);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/startup/saveOnboarding",
      {
        startupid: startupid,
        formStep: "2",
        members: member,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const step3startup = async (
  accessToken,
  startupid,
  partnershipTerms
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/startup/saveOnboarding",
      {
        startupid: startupid,
        formStep: "3",
        partnershipTerms: partnershipTerms,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const step4startup = async (accessToken, startupid, milestonelist) => {
  console.log(milestonelist);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/startup/saveOnboarding",
      {
        startupid: startupid,
        formStep: "4",
        milestones: milestonelist,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
