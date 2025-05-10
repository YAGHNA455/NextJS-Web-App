"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LucideSearch, LucideX } from 'lucide-react';

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  availableTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export default function ProjectSearch({
  searchTerm,
  onSearchChange,
  selectedTags,
  availableTags,
  onTagSelect,
  onTagRemove,
}: ProjectSearchProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <LucideSearch className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 cursor-pointer hover:bg-secondary/80 group"
              onClick={() => onTagRemove(tag)}
            >
              {tag}
              <LucideX className="h-3 w-3 ml-1 text-muted-foreground group-hover:text-foreground" />
            </Badge>
          ))}
        </div>
      )}

      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableTags
            .filter((tag) => !selectedTags.includes(tag))
            .map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onTagSelect(tag)}
              >
                {tag}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}