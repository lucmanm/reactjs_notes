import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const CreateEditNote = () => {
  return (
    <section className="grid w-full max-w-sm items-center gap-1.5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input type="title" id="title" placeholder="title" />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="content">Your Content</Label>
        <Textarea placeholder="Type your note here." id="content" />
      </div>
      <div className="grid w-full gap-1.5">
        <Button >
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>
    </section>
  );
};

export default CreateEditNote;
