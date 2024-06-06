import { Edit, Pin, Trash } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { TNote } from "@/lib/type";
import moment from "moment";
import axiosInstance from "@/lib/axios-instance";
import { useNavigate } from "react-router-dom";

type TNoteProps = {
  data: TNote;
  getAllNotes: () => void;
  onEdit: (data: TNote) => void;
  setAlert: (
    value: React.SetStateAction<{
      alertOn: boolean;
      title: string | null;
      describe: string | null;
      onConfirm?: () => void;
    }>
  ) => void;
};

export default function NoteCard({
  data,
  getAllNotes,
  onEdit,
  setAlert,
}: TNoteProps) {
  const navigate = useNavigate();
  const onDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${id}`);
      if (response) {
        getAllNotes();
        navigate("/");
      }
    } catch (error) {
      console.log("====================================");
      console.log("ERROR_DELETE_NOTE", error);
      console.log("====================================");
    }
  };

  const handleDeleteClick = () => {
    setAlert({
      title: "Delete",
      describe: "Are you sure you want to delete this note?",
      alertOn: true,
      onConfirm: () => onDelete(data.id), // Pass the deletion function as a callback
    });
  };

  return (
    <Card className="hover:shadow-md hover:cursor-pointer lg:pr-2 ">
      <CardContent className="relative top-3">
        <Pin className="h-4 w-4 absolute top-2 right-6 hover:text-teal-500" />
        <h6 className="text-lg font-semibold pt-1">{data.title}</h6>
        <span className="text-xs text-gray-400">
          {moment(data.createdAt).format("do MMM  YYYY")}
        </span>
        <p className="text-sm text-gray-700 line-clamp-2">{data.content}</p>

        <div className="flex items-center justify-between py-1">
          <div className="flex space-x-1">
            {data.tags.map((item, idx) => (
              <span
                key={idx}
                className="text-xs text-green-500 bg-slate-200 p-1 rounded-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-4 *:h-4 *:w-4 ">
            <Trash
              className="hover:text-teal-500"
              onClick={handleDeleteClick}
            />
            <Edit
              className="hover:text-teal-500"
              onClick={() => onEdit(data)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
