import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import InputTag from "./inpu-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { noteSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios-instance";

const noteFormSchem = noteSchema.pick({
  title: true,
  content: true,
  tags: true,
  isPinned: true,
});

type TCreateEditNote = {
  onClose: () => void;
  getAllNotes: () => void;
};

const CreateEditNote: React.FC<TCreateEditNote> = ({ onClose, getAllNotes }) => {
  
  const [tags, setTags] = useState([""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof noteFormSchem>>({
    resolver: zodResolver(noteFormSchem),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      isPinned: false,
    },
  });
  const onSubmit = async (data: z.infer<typeof noteFormSchem>) => {
    try {
      const { title, content, tags, isPinned } = data;

      const response = await axiosInstance.post("/create-note", {
        title,
        content,
        tags,
        isPinned,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log("====================================");
      console.log("ERROR_CREATE_NOTE", error);
      console.log("====================================");
    }
  };

  return (
    <section className="relative grid w-full max-w-sm items-center gap-4">
      <X
        className="absolute -top-2 -right-9 ssize-6 hover:text-red-600 hover:cursor-pointer border-2 rounded-full hover:border-red-600 border-teal-500 text-teal-500"
        onClick={onClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input {...register("title")} type="title" id="title" placeholder="title" />
          <span className="text-sm text-red-500">{errors && errors.title?.message}</span>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">Your Content</Label>
          <Textarea placeholder="Type your note here." id="content" {...register("content")} />
          <span className="text-sm text-red-500">{errors && errors.content?.message}</span>
        </div>
        <InputTag tags={tags} setTags={setTags} />
        <span className="text-sm text-red-500">{errors && errors.tags?.message}</span>
        <div className="grid w-full gap-1.5  ">
          <Button
            type="submit"
            className="bg-gradient-to-bl from-teal-200 to-teal-500
        hover:bg-gradient-to-bl hover:from-teal-100 hover:to-teal-400
        hover:text-slate-600"
          >
            <Save className="mr-2 h-4 w-4 " />
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateEditNote;
