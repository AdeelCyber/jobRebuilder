import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../../http/axiosSet'
//All Freelancers Get
export const getFreelancers = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/freelancer/all', config)
    return resp
  } catch (error) {
    return error.response
  }
}
//All Warnings post
export const getWarnings = async (id) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/getallwarnings',
      { startupid: id },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
//All Requested Warnings post
export const getRequestedWarnings = async (id) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      'startup/getwarningsrequest',
      { startupid: id },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
//All Startups Get
export const getStartups = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const resp = await axios.get('/startup/getclientStartups', config)
    return resp
  } catch (error) {
    return error.response
  }
}
// startup details Post
export const getStartupDetails = async (id) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/getStarupbyId',
      { startupid: id },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Team Roles Post
export const Role = async (id) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/getstartupRoles',
      { startupid: id },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Mile Stones Put
export const EditMileStones = async (startup, milestone, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      '/startup/updatemilestone',
      {
        startupid: startup,
        milestoneid: milestone,
        newMilestone: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Mile Stones Post
export const AddMileStones = async (startup, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/addmilestone',
      {
        startupid: startup,

        newMilestone: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Mile Stones Post Delete
export const DeleteMileStones = async (startup, milestone) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, milestoneid: milestone },
    }
    const resp = await axios.delete('/startup/removemilestone', config)
    return resp
  } catch (error) {
    return error.response
  }
}
// Team Roles Add Post
export const addRoles = async (startup, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/addProjectRole',
      {
        startupid: startup,

        newRole: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// role Post Delete
export const DeleteRoles = async (startup, role) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, roleid: role },
    }
    const resp = await axios.delete('/startup/deletestartupRoles', config)
    return resp
  } catch (error) {
    return error.response
  }
}
// role Put
export const EditRole = async (startup, role, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      'startup/updatestartupRoles',
      {
        startupid: startup,
        roleid: role,
        newRole: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// role Put
export const RoleApply = async (startup, role) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      'jobs/apply',
      {
        startupId: startup,
        roleId: role,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Todo Add Post
export const AddTodo = async (startup, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/addtodo',
      {
        startupid: startup,

        newTodo: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Todo  Delete
export const DeleteTodo = async (startup, role) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { startupid: startup, todoid: role },
    }
    const resp = await axios.delete('/startup/deletetodo', config)
    return resp
  } catch (error) {
    return error.response
  }
}
// Task Put
export const EditTodo = async (startup, Task, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.put(
      'startup/updatetodo',
      {
        startupid: startup,
        todoid: Task,
        newTodo: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Send Warning Post
export const SendWarning = async (startup, warnTo, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/warnmember',
      {
        startupid: startup,
        memberid: warnTo,
        reason: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// Send Warning Post
export const SendRequestWarning = async (startup, warnTo, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/warnings/request',
      {
        startupId: startup,
        warningTo: warnTo,
        reason: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}
// approving or rejecting warning
export const WarnApprove = async (startup, warnTo, data) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      'startup/approvewarning',
      {
        startupid: startup,
        warningid: warnTo,
        status: data,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const getSpecificFreelancer = async (freelancerId) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/freelancer/getByid',
      { freelancerId },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const getExploreData = async () => {
  try {
    const resp = await axios.get('/startup/allStartups')
    return resp
  } catch (error) {
    return error.response
  }
}

export const getFreelancerProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.get('/freelancer/profile', config)
    return resp
  } catch (error) {
    return error.response
  }
}

// freelancer removal request
// Send Warning Post
export const Remove = async (startup, member) => {
  try {
    const token = await AsyncStorage.getItem('@accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(
      '/startup/removeMemberRequest',
      {
        startupid: startup,
        memberid: member,
      },
      config
    )
    return resp
  } catch (error) {
    return error.response
  }
}

export const getFreelancerCategories = async () => {
  try {
    const resp = await axios.get('/skills')
    return resp
  } catch (error) {
    return error.response
  }
}
