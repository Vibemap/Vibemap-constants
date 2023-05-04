import React from "react";

import ReactSelect from 'react-select';

export interface SelectProps {
  primary?: boolean;
  backgroundColor?: string;
  circular: boolean;
  className?: string;
  classNamePrefix: string;
  defaultValue?: object
  size?: "small" | "medium" | "large";
  label: string;
  options: any[];
  onChange?: (e: any) => void;
  placeholder: string;
  width: string;
}

const Select = ({
  circular = true,
  className = 'selectFilter',
  classNamePrefix = 'react-select',
  primary = true,
  backgroundColor,
  defaultValue = undefined,
  size = "medium",
  onChange,
  placeholder = 'Select',
  label,
  options = [],
  width = '250px'
}: SelectProps) => {

  const styles = {
    control: (provided: any, state: any) => ({
      ...provided,
      paddingLeft: '2rem',
      borderRadius: circular ? '6rem' : '0.2rem',
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      borderRadius: circular ? '6rem' : '0.2rem',
      width: width
    }),
    group: (provided: any, state: any) => ({
      ...provided,
      width: width
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      width: width
    }),
  }

  return (
    <ReactSelect
      className={className}
      classNamePrefix={classNamePrefix}
      defaultValue={defaultValue}
      onClick={onChange}
      onChange={onChange}
      placeholder={placeholder}
      styles={styles}
      options={options} />
  )
};

export default Select;
