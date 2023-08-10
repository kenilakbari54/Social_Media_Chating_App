import * as ChatAPI from "../api/ChatRequests.js";

export const createChat = (data) => async (dispatch) => {
    dispatch({ type: "CREATE_CHAT", data: data })
    ChatAPI.createChat(data)
}