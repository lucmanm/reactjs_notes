import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import InputTag from "./inpu-tag";
import { useState } from "react";

type TCreateEditNote = {
  onClose: () => void;
};
const CreateEditNote: React.FC<TCreateEditNote> = ({ onClose }) => {
  
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [tags, setTags] = useState([""]);
  return (
    <section className="relative grid w-full max-w-sm items-center gap-4">
      <X
        className="absolute -top-2 -right-9 ssize-6 hover:text-red-600 hover:cursor-pointer border-2 rounded-full hover:border-red-600 border-teal-500 text-teal-500"
        onClick={onClose}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          type="title"
          id="title"
          placeholder="title"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="content">Your Content</Label>
        <Textarea
          placeholder="Type your note here."
          id="content"
          value={content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setcontent(event.target.value);
          }}
        />
      </div>
      <InputTag tags={tags} setTags={setTags} />
      <div className="grid w-full gap-1.5  ">
        <Button
          className="bg-gradient-to-bl from-teal-200 to-teal-500
        hover:bg-gradient-to-bl hover:from-teal-100 hover:to-teal-400
        hover:text-slate-600"
        >
          <Save className="mr-2 h-4 w-4 " />
          Please wait
        </Button>
      </div>
    </section>
  );
};

export default CreateEditNote;
