import { FormFieldProps } from "@/types";

export const FormField = ({ label, htmlFor, children }: FormFieldProps) => {
  return (
    <fieldset className="fieldset">
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </fieldset>
  );
};
