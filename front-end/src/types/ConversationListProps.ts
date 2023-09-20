export type ConversationListProps = {
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
