"use client";

import { Tag } from "emblor";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const options = [
  { id: "1", text: "Red" },
  { id: "2", text: "Blue" },
  { id: "3", text: "Green" },
  { id: "4", text: "Yellow" },
  { id: "5", text: "Purple" },
];

interface InputWithTagsProps {
  value?: string[]; // Lista de tags
  onChange?: (tags: string[]) => void; // Notifica cambios al padre
  placeholder?: string;
}

export default function InputWithTags({
  value = [],
  onChange,
  placeholder = "Add a tag",
}: InputWithTagsProps) {
  // Convertimos el valor inicial en el estado de tags
  const [exampleTags, setExampleTags] = useState<Tag[]>(
    value.map((text, index) => ({ id: String(index), text }))
  );

  const handleAddTag = (tag: Tag) => {
    if (!exampleTags.find((t) => t.text === tag.text)) {
      const newTags = [...exampleTags, tag];
      setExampleTags(newTags);
      onChange?.(newTags.map((t) => t.text)); // Notificamos cambios
    }
  };

  const handleRemoveTag = (id: string) => {
    const newTags = exampleTags.filter((tag) => tag.id !== id);
    setExampleTags(newTags);
    onChange?.(newTags.map((t) => t.text)); // Notificamos cambios
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "rounded-lg bg-background  transition-shadow focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2  gap-1 cursor-pointer",
              "flex flex-wrap items-center"
            )}
          >
            {exampleTags.map((tag) => (
              <div
                key={tag.id}
                className="h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex items-center me-1"
              >
                {tag.text}
                <button
                  className="absolute inset-y-px end-px p-1 pl-2 rounded-e-lg flex size-7 border border-transparent ring-offset-background transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 text-muted-foreground/80 hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(tag.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            {!exampleTags.length && (
              <Input
                className="w-full focus-visible:outline-none bg-transparent"
                placeholder={placeholder}
                readOnly
              />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex flex-col space-y-1">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="ghost"
                className="text-left justify-start"
                onClick={() => handleAddTag(option)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
