import React from "react";
import "../Sort/sort.scss";

interface PopUpProps {
  value: React.ReactNode;
  liList?: React.ReactNode;
  className?: string;
}

const PopUp: React.FC<PopUpProps> = ({ value, liList }) => {
  const popUpRef = React.useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  React.useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUpRef]);

  return (
    <div ref={popUpRef} className="sort">
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="sort__label"
      >
        <div className="dropdown-value">{value}</div>
      </div>
      {isDropdownOpen && <div className="sort__popup">{liList}</div>}
    </div>
  );
};

export default PopUp;
