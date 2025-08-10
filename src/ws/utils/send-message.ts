import { clients } from "../clients";


interface SendOptions {
  toUserId?: string;
  toAll?: boolean;
  toRole?: string;
  message: string;
  type?: string;
  data?: unknown
}

export const sendMessage = ({
  toUserId,
  toAll = false,
  toRole,
  message,
  type = 'system',
  data = null
}: SendOptions) => {
  const payload = JSON.stringify({
    type,
    text: message,
    timestamp: new Date().toISOString(),
    data
  });

  for (const [id, client] of clients) {
    if (client.readyState !== client.OPEN) continue;

    // Send to specific user
    if (toUserId && id === toUserId) {
      client.send(payload);
      break;
    }

    // Send to users by role
    if (!toAll && toRole && client.role === toRole) {
      client.send(payload);
    }

    // Send to all
    if (toAll) {
      client.send(payload);
    }

  }
};
