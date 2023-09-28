type EditUsernameProps = {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const EditUsername = ({
  inputRef,
  inputValue,
  setInputValue,
}: EditUsernameProps) => {
  return (
    <div className="grid grid-cols-1 auto-rows-min gap-y-1">
      <input
        type="text"
        name="name"
        value={inputValue}
        className="border-none outline-none bg-neutral-800 w-64 h-8 pl-1 rounded"
        maxLength={25}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        ref={inputRef}
      />
      <div className="w-min h-min px-[20px] py-.5 bg-fuchsia-700 text-fuchsia-50 text-sm justify-self-end rounded-lg">
        {inputValue.length}/25
      </div>
    </div>
  );
};
