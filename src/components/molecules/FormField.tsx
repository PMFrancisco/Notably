import React from 'react'
import { Label, Input, Textarea } from '../atoms'

interface BaseFormFieldProps {
  id: string
  label: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

interface TextFormFieldProps extends BaseFormFieldProps {
  type: 'text'
  value: string
  onChange: (value: string) => void
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  type: 'textarea'
  value: string
  onChange: (value: string) => void
  rows?: number
}

type FormFieldProps = TextFormFieldProps | TextareaFormFieldProps

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { id, label, placeholder, disabled, required, className, type, value, onChange } = props

  return (
    <div className={`space-y-2 ${className || ''}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={(props as TextareaFormFieldProps).rows}
          className="min-h-[100px] resize-none"
        />
      ) : (
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  )
} 