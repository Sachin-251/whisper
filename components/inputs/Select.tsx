"use client";

import ReactSelect from "react-select/creatable";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled
}) => {
  return ( 
  <div className="z-[100]">
    <label
      className="
        block
        text-sm
        font-medium
        leading-6
        text-slate-200
      "
    >
      {label}
    </label>
    <div className="mt-2">
      <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            padding: 2
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: '#0f0f0f',
            borderColor: '#64748b',
            "&:hover": {borderColor: '#64748b'}
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            "&:hover" : {backgroundColor: 'gray'},
            backgroundColor: 'inherit',
            borderRadius: 5,
            color: '#fff',
            padding: 3
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: '#0f0f0f',
            borderColor: '#64748b',
            padding: 4
          })
          
        }}
        classNames={{
          control: () => "text-sm",
          option: baseStyles => "bg-secondary-bg"
        }}
      />
    </div>
  </div>
   );
}
 
export default Select;