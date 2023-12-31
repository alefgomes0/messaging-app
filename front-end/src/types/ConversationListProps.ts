import { ErrorMessage } from "./ErrorMessage";

export type LastMessageWithContact = {
  messages: [
    {
      date: string;
      message: string;
      _id: string;
      time: string;
    }
  ];
  participants: [
    {
      _id: string;
      name: string;
      profilePicture?: string;
    }
  ];
  newMessage?: {
    read: boolean;
    sender: string;
    receiver: string;
  }
  _id: string;
};

export type ConversationListProps = {
  error: ErrorMessage | null;
  isLoading: boolean;
  conversationListInfo: null | LastMessageWithContact[];
};
