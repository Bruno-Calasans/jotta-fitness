import type { FocusEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

export default function clearFieldOnFirstFocus<TFormValues extends FieldValues>(
  { target }: FocusEvent<HTMLInputElement, Element>,
  form: UseFormReturn<TFormValues>
) {
  const fieldName = target.name;
  const { isTouched } = form.getFieldState(fieldName as Path<TFormValues>);

  if (!isTouched) target.value = "";
}
