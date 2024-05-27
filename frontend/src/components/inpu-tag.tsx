import { Plus, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface TStateTags {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
}

const InputTag = ({ setTags, tags }: TStateTags) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      
      <div className="grid w-full gap-1.5 mt-2">
        <Label htmlFor="content">Tags</Label>
        <div className="flex items-center justify-start gap-4">
          <Input
            type="text"
            placeholder="Tag"
            className="w-1/2"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addNewTag} variant="outline">
            <Plus className="size-6" />
          </Button>
        </div>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-1 rounded-md bg-slate-100 px-2">
              <span className="tag-text">#{tag}</span>
              <X
                onClick={() => handleRemoveTag(tag)}
                className="cursor-pointer size-4 hover:text-red-600"
              />
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default InputTag;
