import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const data = {
  title: "Note App",
  date: "6th April 2024",
  content:
    "LorLorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis eveniet magnam reiciendis, commodi nostrum ut optio laboriosam ducimus. Quasi quo cupiditate itaque asperiores. Pariatur omnis placeat deserunt facilis quos.em",
  tags: "#Web #note",

  isPinned: false,
};
function Dashboard() {
  return (
    <section className="pt-4 ">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {Array.from({ length: 10 }).map((_, idx) => (
          <NoteCard key={idx} data={data} />
        ))}
      </div>
      <Button variant="ghost" className="sticky bg-lime-400 hover:bg-lime-500">
        <Plus className="h-6 w-6" />
      </Button>
    </section>
  );
}

export default Dashboard;
