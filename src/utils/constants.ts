export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  GROUPS = 'groups',
  GROUP_MESSAGES = 'groups/:id/messages',
  GROUP_RECIPIENTS = 'groups/:id/recipients',
  EXISTS = 'exists',
  FRIENDS = 'friends',
  FRIEND_REQUESTS = 'friends/requests',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGE_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  GROUPS = 'GROUPS_SERVICE',
  GROUP_MESSAGES = 'GROUP_MESSAGES_SERVICE',
  GROUP_RECIPIENTS = 'GROUP_RECIPIENTS_SERVICE',
  FRIENDS_SERVICE = 'FRIENDS_SERVICE',
  FRIENDS_REQUESTS_SERVICE = 'FRIEND_REQUEST_SERVICE',
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
}
