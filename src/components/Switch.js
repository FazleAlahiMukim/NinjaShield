import Switch from "react-switch";

export default function ({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      onColor="#B396F7" // Track color when checked (Bright purple)
      offColor="#E5E7EB" // Track color when unchecked (Light gray)
      onHandleColor="#7C3AED" // Handle color when checked (Deep violet)
      offHandleColor="#6B7280" // Handle color when unchecked (Dark gray)
      handleDiameter={20} // Diameter of the handle
      uncheckedIcon={false} // No icon when unchecked
      checkedIcon={false} // No icon when checked
      height={15} // Height of the switch
      width={36} // Width of the switch
      className="react-switch"
    />
  );
}
