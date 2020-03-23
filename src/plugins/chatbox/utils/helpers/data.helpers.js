export const userInformationDTO = (data) => ({
  userId: data.userId || 0,
  roomId: data.roomId || 0,
  displayName: data.displayName || "",
  userPhotoUrl: data.userPhotoUrl || "",
  shortBio: data.shortBio || "",
  memberSince: data.memberSince || "",
  locationName: data.locationName || ""
});

export const roomDetailDTO = (data) => ({
  roomName: data.roomName || "",
  roomPhotoUrl: data.roomPhotoUrl || "",
  messages: data.messages || [],
  limit: data.limit || 0,
  totalPages: data.totalPages || 0,
  totalElements: data.totalElements || 0,
  isBlocked: data.isBlocked || false,
  isReported: data.isReported || false,
  isMyBlock: data.isMyBlock || false
});
