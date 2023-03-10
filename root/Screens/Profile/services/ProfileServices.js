import axios from '../../../http/axiosSet'
import instance from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getProfile = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = await axios.get('/freelancer/profile', config)
    return resp
  } catch (error) {
    return error.response
  }
}

export const setProfile = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const name = await AsyncStorage.getItem('@name')
    const email = await AsyncStorage.getItem('@email')
    const gender = await AsyncStorage.getItem('@gender')
    const country = await AsyncStorage.getItem('@country')
    const city = await AsyncStorage.getItem('@city')
    const language = await AsyncStorage.getItem('@language')
    const skill = await AsyncStorage.getItem('@skills')
    const workPreference = await AsyncStorage.getItem('@workPreference')
    const availibilityPerWeek = await AsyncStorage.getItem(
      '@availibilityPerWeek'
    )
    const jobTitle = await AsyncStorage.getItem('@jobTitle')
    const hourlyRate = await AsyncStorage.getItem('@hourlyRate')
    const description = await AsyncStorage.getItem('@description')
    const image = await AsyncStorage.getItem('@image')
    const skills = JSON.parse(skill)
    console.log(name)
    if (
      name !== null &&
      email !== null &&
      gender !== null &&
      country !== null &&
      city !== null &&
      language !== null &&
      skills !== null &&
      workPreference !== null &&
      availibilityPerWeek !== null &&
      jobTitle !== null &&
      hourlyRate !== null &&
      description !== null &&
      image !== null
    ) {
        let data = {
            gender: gender,
            country: country,
            city: city,
            language: language,
            skills: skills,
            workPreference: workPreference,
            availibilityPerWeek: availibilityPerWeek,
            jobTitle: jobTitle,
            hourlyRate: hourlyRate,
            description: description,
            image: image,
        }
      const resp = await axios.post(
        '/freelancer/onboarding',
        data,
        config
      )

      return resp
    }
  } catch (error) {
    return error.response
  }
}

export const editServices = async (
  accessToken,
  userdesc,
  value,
  skillsofuser
) => {
  console.log(accessToken)
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = await axios.put(
      '/freelancer/profile/services',
      {
        description: userdesc,
        hourlyRate: value,
        skills: skillsofuser,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const publishPortfolio = async (
  accessToken,
  projname,
  projdesc,
  img
) => {
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = await axios.post(
      '/freelancer/profile/portfolio',
      {
        title: projname,
        description: projdesc,
        attachments: img,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const editPortfolio = async (
  accessToken,
  portfolioid,
  projname,
  projdesc,
  imgg
) => {
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = await axios.put(
      '/freelancer/profile/portfolio/update',
      {
        portfolioId: portfolioid,
        title: projname,
        description: projdesc,
        attachments: imgg,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const deletePortfolio = async (accessToken, portfolioId) => {
  console.log(accessToken)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `bearer ${accessToken}`,
    },
    data: {
      portfolioId: portfolioId,
    },
  }
  try {
    const resp = await axios.delete(
      '/freelancer/profile/portfolio/delete',
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const editProfile = async (
  accessToken,
  name,
  job,
  city,
  country,
  language,
  work,
  about,
  image
) => {
  console.log(name)
  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  }
  try {
    const resp = await axios.put(
      '/freelancer/profile/aboutMe/update',
      {
        name: name,
        language: language,
        country: country,
        city: city,
        jobTitle: job,
        hoursPerWeek: work,
        hourlyRate: work,
        aboutMe: about,
        avatar: image,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const editStartupProfile = async (accessToken, name, image) => {
  console.log(name)
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  try {
    const resp = await instance.put(
      `${axios.defaults.baseURL}user/update/profilePhotoandName`,
      {
        name: name,
        avatar: image,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
