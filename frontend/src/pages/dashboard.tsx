import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import { useState } from "react";
import CreateEditNote from "@/components/create-edit-note";
const data = {
  title: "Note App",
  date: "6th April 2024",
  content:
    "LorLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis eveniet magnam reiciendis, commodi nostrum ut optio laboriosam ducimus. Quasi quo cupiditate itaque asperiores. Pariatur omnis placeat deserunt facilis quos.em",
  tags: "#Web #note",

  isPinned: false,
};
function Dashboard() {
  const [onMondal, setOnMondal] = useState({
    isOpen: false,
    type: "create",
    data: null,
  });
  return (
    <section className=" flex-1">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 py-4 ">
        {Array.from({ length: 20 }).map((_, idx) => (
          <NoteCard key={idx} data={data} />
        ))}
      </div>
      <Button
        variant="ghost"
        className="fixed bg-gradient-to-r from-lime-400 to-lime-500 hover:bg-lime-500 border-lime-900 rounded-full p-0 shadow-md 
        w-12 h-12 flex items-center justify-center bottom-10 right-10"
        onClick={() => {
          setOnMondal({ isOpen: true, type: "create", data: null });
        }}
      >
        <Plus className="size-6" />
      </Button>
      <Modal
        isOpen={onMondal.isOpen}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-1/4 bg-white rounded-md max-auto mt-14 flex items-center justify-center p-4 container"
      >
        <CreateEditNote />
      </Modal>
    </section>
  );
}

export default Dashboard;
