import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';

const entities = [User, Session, Conversation, Message];

export default entities;

export { User, Session, Conversation, Message };
