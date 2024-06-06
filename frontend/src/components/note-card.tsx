import { Edit, Pin, Trash } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { TNote } from "@/lib/type";
import moment from "moment";
import axiosInstance from "@/lib/axios-instance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertModal from "./alert-modal";

type TNoteProps = {
  data: TNote;
  getAllNotes: () => void;
  onEdit: (data: TNote) => void;
};

export default function NoteCard({ data, getAllNotes, onEdit }: TNoteProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);
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

  return (
    <Card className="hover:shadow-md hover:cursor-pointer lg:pr-2 ">
      <AlertModal
        title="Delete"
        description="are you sure you want to delete this note?"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(!isOpen)}
        onConfirm={onDelete}
      />
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
              onClick={() => setIsOpen(!isOpen)}
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
