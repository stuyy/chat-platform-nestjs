import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Participant } from './entities/Participant';

const entities = [User, Session, Conversation, Participant];

export default entities;

export { User, Session, Conversation, Participant };
