export type ConversationProps = {
  _id?: string;
  date: string;
  message: string;
  time: string;
  participants: { sender: string };
};