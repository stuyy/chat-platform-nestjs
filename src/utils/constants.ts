import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  USERS_PROFILES = 'users/profiles',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  GROUPS = 'groups',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = 'groups/:id/recipients',
  EXISTS = 'exists',
  FRIENDS = 'friends',
  FRIEND_REQUESTS = 'friends/requests',
  USER_PRESENCE = 'users/presence',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  USERS_PROFILES = 'USERS_PROFILES_SERVICE',
  USER_PRESENCE = 'USER_PRESENCE_SERVICE',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGE_SERVICE',
  MESSAGE_ATTACHMENTS = 'MESSAGE_ATTACHMENTS_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  GROUPS = 'GROUPS_SERVICE',
  GROUP_MESSAGES = 'GROUP_MESSAGES_SERVICE',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENTS_SERVICE',
  FRIENDS_SERVICE = 'FRIENDS_SERVICE',
  FRIENDS_REQUESTS_SERVICE = 'FRIEND_REQUEST_SERVICE',
  SPACES_CLIENT = 'SPACES_CLIENT',
  IMAGE_UPLOAD_SERVICE = 'IMAGE_UPLOAD_SERVICE',
}

export enum ServerEvents {
  FRIEND_REQUEST_ACCEPTED = 'friendrequest.accepted',
  FRIEND_REQUEST_REJECTED = 'friendrequest.rejected',
  FRIEND_REQUEST_CANCELLED = 'friendrequest.cancelled',
  FRIEND_REMOVED = 'friend.removed',
}

export enum WebsocketEvents {
  FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
  FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
  VIDEO_CALL_REJECTED = 'onVideoCallRejected',
  VOICE_CALL_ACCEPTED = 'onVoiceCallAccepted',
  VOICE_CALL_HANG_UP = 'onVoiceCallHangUp',
  VOICE_CALL_REJECTED = 'onVoiceCallRejected',
}

export const UserProfileFileFields: MulterField[] = [
  {
    name: 'banner',
    maxCount: 1,
  },
  {
    name: 'avatar',
    maxCount: 1,
  },
];
