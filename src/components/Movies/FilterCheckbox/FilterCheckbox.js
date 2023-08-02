import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox({ onChange, checked }) {
  return (
    <label className="switch">
      <input type="checkbox"
        onChange={onChange}
        name='isShortMovie'
        checked={checked}
        id='switch' />
      <span className="switch__button"></span>
    </label>
  )
}

export default FilterCheckbox;
