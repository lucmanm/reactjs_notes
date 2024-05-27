import { Edit, Pin, Trash } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type TNoteCard = {
  title: string;
  date: string;
  content: string;
  tags: string;
  isPinned: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onPinNote?: () => void;
};

export default function NoteCard({ data }: { data: TNoteCard }) {
  return (
    <Card className="hover:shadow-md hover:cursor-pointer lg:pr-2 ">
      <CardContent className="relative top-3">
        <Pin className="h-4 w-4 absolute top-2 right-6 hover:text-teal-500" />
        <h6 className="text-lg font-semibold pt-1">{data.title}</h6>
        <span className="text-xs text-gray-400">{data.date}</span>
        <p className="text-sm text-gray-700 line-clamp-2">{data.content}</p>

        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-gray-400">{data.tags}</span>
          <div className="flex gap-4 *:h-4 *:w-4 ">
            <Trash className="hover:text-lime-500" />
            <Edit className="hover:text-lime-500"/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
