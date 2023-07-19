"use client";
interface FormattedNumberInputProps {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  isCurrency?: boolean;
}

const FormattedNumberInput: React.FC<FormattedNumberInputProps> = ({
  value,
  onValueChange,
  label,
  isCurrency = true,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (isCurrency && input[0] === "$") {
      input = input.slice(1);
    }

    const noCommas = input.replace(/,|\$/g, "");
    console.log("noCommas", noCommas);
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (input === "" || regex.test(noCommas)) {
      let formattedInput = noCommas;

      if (noCommas !== "" && !noCommas.includes(".")) {
        formattedInput = new Intl.NumberFormat().format(parseInt(noCommas));
      }

      onValueChange(formattedInput);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={isCurrency ? `$${value}` : value}
        onChange={handleOnChange}
        id="floating_outlined"
        className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FormattedNumberInput;
