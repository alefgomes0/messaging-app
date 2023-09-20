export const Loading = () => {
  return (
    <span className="flex text-fuchsia-700">
      <span className="text-9xl animate-[loading1_2s_ease_infinite]">.</span>
      <span className="text-9xl animate-[loading2_2s_ease_infinite]">.</span>
      <span className="text-9xl animate-[loading3_2s_ease_infinite]">.</span>
    </span>
  );
};
