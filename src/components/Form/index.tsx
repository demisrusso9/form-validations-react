import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './style.module.scss'
import InputError from '../InputError'

export default function Form() {
  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(1).max(130).required(),
    password: yup.string().min(6).max(30).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required()
  })

  const onSubmit = (data: any) => console.log(data)
  const onError = (data: any) => console.log(data)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  /*
    Form validation are used with react-hook-form library and yup Schema Validation

    Instead of adding useState example: (name, setName), we add {...register('name')} on the <input> tag
    All erros are shown on the formState: { errors }

    Yup is used for field validation, using resolver
   */

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor='firstName'>First name *</label>
        <input
          id='firstName'
          placeholder='First name...'
          {...register('firstName')}
        />
        {errors?.firstName?.type && (
          <InputError type={errors.firstName.type} field='firstName' />
        )}
      </div>

      <div>
        <label htmlFor='lastName'>Last name *</label>
        <input
          id='lastName'
          placeholder='Last name...'
          {...register('lastName')}
        />
        {errors?.lastName?.type && (
          <InputError type={errors.lastName.type} field='lastName' />
        )}
      </div>

      <div>
        <label htmlFor='email'>Email *</label>
        <input id='email' placeholder='Email...' {...register('email')} />
        {errors?.email?.type && (
          <InputError type={errors.email.type} field='email' />
        )}
      </div>

      <div>
        <label htmlFor='age'>Age *</label>
        <input id='age' placeholder='Age...' {...register('age')} />
        {errors?.age?.type && <InputError type={errors.age.type} field='age' />}
      </div>

      <div>
        <label htmlFor='password'>Password *</label>
        <input
          id='password'
          placeholder='password...'
          {...register('password')}
        />
        {errors?.password?.type && (
          <InputError type={errors.password.type} field='password' />
        )}
      </div>

      <div>
        <label htmlFor='confirmPassword'>Confirm Password *</label>
        <input
          id='confirmPassword'
          placeholder='Confirm password...'
          {...register('confirmPassword')}
        />
        {errors?.confirmPassword?.type && (
          <InputError
            type={errors.confirmPassword.type}
            field='confirmPassword'
          />
        )}
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}
