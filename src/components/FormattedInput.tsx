"use client";

interface FormattedNumberInputProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const FormattedNumberInput: React.FC<FormattedNumberInputProps> = ({
  value,
  onValueChange,
  className,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const noCommas = input.replace(/,/g, "");

    // Test if the new input includes only digits or a single decimal point
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (input === "" || regex.test(noCommas)) {
      let formattedInput = noCommas;

      // Only parse and format if not empty and no decimal point
      if (noCommas !== "" && !noCommas.includes(".")) {
        formattedInput = new Intl.NumberFormat().format(parseInt(noCommas));
      }

      // Update the state with the formatted input
      onValueChange(formattedInput);
    }
  };

  return (
    <input value={value} onChange={handleOnChange} className={className} />
  );
};

export default FormattedNumberInput;
