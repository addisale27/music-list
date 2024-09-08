import { IconType } from "react-icons";

interface AdminNavProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}
const AdminNavItem: React.FC<AdminNavProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center p-2 border-b-2 gap-1 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? `border-b-slate-800 text-slate-800`
          : `border-transparent text-slate-500`
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
