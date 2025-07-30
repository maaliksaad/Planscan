import type {
  FieldPath,
  FieldValues,
  UseFormGetFieldState
} from 'react-hook-form'

export type FormItemContextValue = {
  id: string
}

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export interface UseFormFieldReturn
  extends ReturnType<UseFormGetFieldState<FieldValues>> {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
}
