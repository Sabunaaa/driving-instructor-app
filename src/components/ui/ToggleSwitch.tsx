import React from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
        />
        <div className="toggle-switch-background">
          <div className="toggle-switch-handle" />
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    cursor: pointer;
  }

  .toggle-switch input[type="checkbox"] {
    display: none;
  }

  .toggle-switch-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ddd;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px #ccc;
    transition: background-color 0.3s ease-in-out;
  }

  .toggle-switch-handle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
  }

  .toggle-switch::before {
    content: "";
    position: absolute;
    top: -25px;
    right: -35px;
    font-size: 12px;
    font-weight: bold;
    color: #aaa;
    text-shadow: 1px 1px #fff;
    transition: color 0.3s ease-in-out;
  }

  .toggle-switch input[type="checkbox"]:checked + .toggle-switch-background {
    background-color: #05c46b;
    box-shadow: inset 0 0 0 1px #04b360;
  }

  .toggle-switch input[type="checkbox"]:checked + .toggle-switch-background .toggle-switch-handle {
    transform: translateX(20px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 0 0 2px #05c46b;
  }

  .toggle-switch input[type="checkbox"]:checked::before {
    content: "On";
    color: #05c46b;
    right: -15px;
  }
`;

export default ToggleSwitch;
