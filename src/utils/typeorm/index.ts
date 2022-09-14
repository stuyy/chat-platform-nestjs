import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { Group } from './entities/Group';
import { GroupMessage } from './entities/GroupMessage';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { Profile } from './entities/Profile';
import { MessageAttachment } from './entities/MessageAttachment';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
];

export default entities;

export {
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
};
