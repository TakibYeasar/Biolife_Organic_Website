const ActionButton = ({ label, onClick, icon, bgColor, hoverColor }) => (
    <button
        className={`flex items-center gap-1 ${bgColor} text-white px-3 py-1 rounded-md hover:${hoverColor}`}
        onClick={onClick}
    >
        {icon} {label}
    </button>
);

export default ActionButton;