import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { TNote } from "@/lib/type";
import { Card } from "@/components/ui/card";
import NoteFrom from "@/components/note-form";
import { string } from "zod";
const data = {
  title: "Note App",
  date: "6th April 2024",
  content:
    "LorLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis eveniet magnam reiciendis, commodi nostrum ut optio laboriosam ducimus. Quasi quo cupiditate itaque asperiores. Pariatur omnis placeat deserunt facilis quos.em",
  tags: "#Web #note",

  isPinned: false,
};
function Dashboard() {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [onMondal, setOnMondal] = useState({
    isOpen: false,
    type: "create",
    data: null,
  });

  const onOpen = () => {
    setOnMondal((prev) => ({
      ...prev,
      isOpen: true,
    }));
  };

  const onClose = () => {
    setOnMondal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log("====================================");
      console.log("ERROR_GET_LIST_NOTES", error);
      console.log("====================================");
    }
  };

  const handlEdit = async (id: string) => {
    onOpen();
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <section className=" flex-1">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 py-4 ">
        {notes.length > 0 ? (
          notes.map((data, index) => (
            <NoteCard
              key={index}
              data={data}
              getAllNotes={getAllNotes}
              onEdit={() => handlEdit(data._id)}
            />
          ))
        ) : (
          <Card className="col-span-3 text-center p-4">No Notes Availble</Card>
        )}
      </div>
      {/* create Note Button */}
      <Button
        variant="ghost"
        className="fixed bg-teal-800 hover:bg-teal-300  border-teal-500 rounded-full p-0 shadow-lg w-12 h-12 flex items-center justify-center bottom-10 right-10"
        onClick={onOpen}
      >
        <Plus className="size-6" />
      </Button>
      <Modal
        isOpen={onMondal.isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="relative w-1/4 bg-white rounded-md max-auto mt-14 flex items-center justify-center p-4 container"
      >
        <NoteFrom onClose={onClose} getAllNotes={getAllNotes} />
      </Modal>
    </section>
  );
}

export default Dashboard;
