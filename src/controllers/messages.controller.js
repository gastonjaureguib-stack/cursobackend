import { getMessagesService, createMessageService } from '../services/messages.service.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await getMessagesService();
        res.json({ status: 'success', payload: messages });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createMessage = async (req, res) => {
    try {
        const newMessage = await createMessageService(req.body);
        res.status(201).json({ status: 'success', payload: newMessage });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};