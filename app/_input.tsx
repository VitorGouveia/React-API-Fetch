import { FunctionComponent, ReactNode, useId } from "react";

type Props = {
  children: ReactNode;
  name: string;
  placeholder: string;
  inline?: boolean;
};

export const Input: FunctionComponent<Props> = ({
  children,
  name,
  placeholder,
  inline,
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`flex ${inline ? "flex-row items-center" : "flex-col"} gap-2 text-sm font-medium leading-6 text-gray-900`}
    >
      <span className="flex shrink-0">{children}</span>

      {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
          workcation.com/
        </span>
      </div> */}
      <input
        type="text"
        name={name}
        id={id}
        // autoComplete=""
        placeholder={placeholder}
        className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </label>
  );
};

type LabelProps = {
  children: ReactNode;
};

export const Label: FunctionComponent<LabelProps> = ({ children }) => {
  return <>{children}</>;
};
