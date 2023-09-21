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
      name: string;
      _id: string;
    }
  ];
};

export type ConversationListProps = {
  error: ErrorMessage | null;
  isLoading: boolean;
  conversationListInfo: null | LastMessageWithContact[];
};
