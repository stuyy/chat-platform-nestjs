import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { GroupConversation } from './entities/GroupConversation';
const entities = [User, Session, Conversation, Message, GroupConversation];

export default entities;

export { User, Session, Conversation, Message, GroupConversation };
