import axios from '../../../http/axiosSet'

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
  mediatosend,
  logo,
  getdocinfo,
  value1
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/saveOnboarding',
      {
        formStep: '1',
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
          url: mediatosend,
        },
        logo: logo,
        businessPlan: getdocinfo,
        stage: value1,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const step2startup = async (accessToken, startupid, member) => {
  console.log(startupid)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/saveOnboarding',
      {
        startupid: startupid,
        formStep: '2',
        members: member,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const step3startup = async (
  accessToken,
  startupid,
  partnershipTerms
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/saveOnboarding',
      {
        startupid: startupid,
        formStep: '3',
        partnershipTerms: partnershipTerms,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const step4startup = async (accessToken, startupid, milestonelist) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/saveOnboarding',
      {
        startupid: startupid,
        formStep: '4',
        milestones: milestonelist,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const step5startup = async (accessToken, startupid, pitch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/saveOnboarding',
      {
        startupid: startupid,
        formStep: '5',
        pitchDeck: pitch,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const publishStartup = async (accessToken, startupid) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/publishStartup',
      {
        startupid: startupid,
      },
      config
    )
    return resp
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export const addStartupRole = async (accessToken, startupid, newRole) => {
  console.log(newRole)
  let finalObj = {}
  for (let i = 0; i < newRole.length; i++) {
    Object.assign(finalObj, newRole[i])
  }
  console.log(finalObj)
  console.log(startupid)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/startup/addProjectRole',
      {
        startupid: startupid,
        newRole: finalObj,
      },
      config
    )
    return resp
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export const getmembers = async (accessToken, search) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.post(
      '/freelancer/findByName',
      {
        name: search,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const startupNames = async (accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = axios.get(
      '/startup/startupNames',

      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const getStartupCategories = async () => {
  try {
    const resp = await axios.get('startup/allCatergories')
    return resp
  } catch (error) {
    return error.response
  }
}
