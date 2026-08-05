export default class MessagesRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getMessages() {
        return await this.dao.get();
    }

    async createMessage(messageData) {
        return await this.dao.create(messageData);
    }
}