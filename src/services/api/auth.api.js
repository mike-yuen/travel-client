import api from "@/utils/api";
import { API_URL } from "@/utils/api/constants";

export const authenticate = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, email, password } = userInfo;
      const resp = await api.post(`${API_URL.AUTH}`, {
        username,
        email,
        password
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const registration = userInfo => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = api.post(`${API_URL.REGISTRATION}`, userInfo, {
        useFormData: true,
        key: "avatar"
      });

      if (response) {
        resolve(response);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const postEmail = emailReset => {
  return new Promise(async (resolve, reject) => {
    try {
      const postemail = await api.post(`${API_URL.RESET_PASSWORD_MAIL}`, {
        email: emailReset
      });
      if (postemail) {
        resolve(postemail);
      }
    } catch (err) {
      reject(err);
    }
  });
};
export const postResetPass = dataReset => {
  return new Promise(async (resolve, reject) => {
    try {
      const { new_password1, new_password2, uid, token } = dataReset;
      const postpass = await api.post(`${API_URL.RESET_PASSWORD}`, {
        new_password1,
        new_password2,
        uid,
        token
      });
      if (postpass) {
        resolve(postpass);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const location = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`${API_URL.USER_LOCATION}`);
      if (response) {
        resolve(response);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const city = locationInfo => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`${API_URL.USER_CITY}`, {
        params: locationInfo
      });
      if (response) {
        resolve(response);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const business = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`${API_URL.USER_BUSINESS}`);
      if (response) {
        resolve(response);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const postChangePassword = dataChange => {
  return new Promise(async (resolve, reject) => {
    try {
      const { new_password1, new_password2, old_password } = dataChange;
      const postpass = await api.post(`${API_URL.CHANGE_PASSWORD}`, {
        new_password1,
        new_password2,
        old_password
      });
      if (postpass) {
        resolve(postpass);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const termPrivacy = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`${API_URL.TERM_PRIVACY}`);
      if (response) {
        resolve(response);
      }
    } catch (err) {
      reject(err);
    }
  });
};
