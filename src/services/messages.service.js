import MessagesDao from '../dao/messages.dao.js';
import MessagesRepository from '../repositories/messages.repository.js';

const messagesDao = new MessagesDao();
const messagesRepository = new MessagesRepository(messagesDao);

export const getMessagesService = async () => {
    return await messagesRepository.getMessages();
};

export const createMessageService = async (messageData) => {
    return await messagesRepository.createMessage(messageData);
};