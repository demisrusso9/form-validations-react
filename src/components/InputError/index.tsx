import errors from '../../utils/errors.json'

type InputErrorProps = {
  type: string
  field: string
}

export default function InputError({ type, field }: InputErrorProps) {
  // @ts-expect-error
  return <small>{errors[field][type]}</small>
}
