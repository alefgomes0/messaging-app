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
};

export type ConversationListProps = {
  error: ErrorMessage | null;
  isLoading: boolean;
  conversationListInfo: null | LastMessageWithContact[];
};
