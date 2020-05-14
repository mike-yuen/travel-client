import api from "../utils/api";
import { API_URL } from "./constants.api";

export const getInformationUserAndRoom = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.get(
        `${API_URL.GET_INFORMATION_USER_N_ROOM + userId}`
      );
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getTokenLoginFirebase = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.post(`${API_URL.GET_TOKEN_LOGIN_FIREBASE}`);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getDetailRoom = (dataId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const { userId, roomId } = dataId;
      const resp = await api.post(`${API_URL.GET_DETAIL_ROOM}`, dataId);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getChatList = (pagination) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { page, limit } = pagination;
      const resp = await api.get(`${API_URL.GET_CHAT_LIST}`, {
        params: {
          page: page,
          limit: limit
        }
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getRoomInChatList = (roomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.get(`${API_URL.GET_CHAT_LIST + roomId}`);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getListMessageHistories = (dataGetList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { page, roomId } = dataGetList;
      const resp = await api.get(
        `${API_URL.GET_LIST_MESSAGE_HISTORIES + roomId}`,
        {
          params: {
            page: page
          }
        }
      );
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const sendMessage = (dataMessage) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { roomId, message } = dataMessage;
      const resp = await api.post(`${API_URL.SEND_MESSAGE}`, {
        roomId,
        message
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const toggleBlockUser = (dataBlock) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { roomId, isBlock } = dataBlock;
      const resp = await api.post(`${API_URL.TOGGLE_BLOCK}`, {
        roomId,
        isBlock
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const clearChat = (roomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.delete(`${API_URL.CLEAN_CHAT}/${roomId}`);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const markRead = (roomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.post(`${API_URL.MARK_READ}`, {
        roomId: roomId
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};
