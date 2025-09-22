import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

const SUGGESTED_TAGS = [
  "AI",
  "Machine Learning",
  "Web Development",
  "React",
  "JavaScript",
  "Python",
  "Data Science",
  "Blockchain",
  "Cryptocurrency",
  "Startup",
  "Innovation",
  "Productivity",
  "Remote Work",
  "Leadership",
  "Marketing",
  "Design",
  "UX/UI",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Security",
  "Healthcare",
  "Education",
  "Finance",
  "Environment",
  "Sustainability",
  "Travel",
  "Food",
  "Fitness",
  "Mental Health",
  "Photography",
  "Art",
]

interface TagSelectorProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  maxTags?: number
}

export function TagSelector({ selectedTags, onTagsChange, maxTags = 10 }: TagSelectorProps) {
  const [inputValue, setInputValue] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = SUGGESTED_TAGS.filter(
    (tag) => tag.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.includes(tag),
  ).slice(0, 8)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const addTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag.trim()) && selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tag.trim()])
      setInputValue("")
      setIsDropdownOpen(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1])
    }
  }

  const handleInputFocus = () => {
    setIsDropdownOpen(true)
  }

  return (
    <div className="space-y-3" ref={dropdownRef}>
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag, index) => (
            <Badge key={index} className="bg-emerald-600 hover:bg-emerald-700 pr-1">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTag(tag)}
                className="h-4 w-4 p-0 ml-1 hover:bg-emerald-800"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onFocus={handleInputFocus}
          placeholder={selectedTags.length >= maxTags ? `Maximum ${maxTags} tags reached` : "Type to add tags..."}
          disabled={selectedTags.length >= maxTags}
          className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
        />

        {/* Add Button */}
        {inputValue.trim() && (
          <Button
            onClick={() => addTag(inputValue)}
            size="sm"
            className="absolute right-1 top-1 h-8 bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}

        {/* Dropdown Suggestions */}
        {isDropdownOpen && (filteredSuggestions.length > 0 || inputValue.trim()) && (
          <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-slate-800 border-slate-700">
            <CardContent className="p-2">
              {/* Custom Tag */}
              {inputValue.trim() && !SUGGESTED_TAGS.includes(inputValue.trim()) && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white mb-1"
                  onClick={() => addTag(inputValue)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add "{inputValue.trim()}"
                </Button>
              )}

              {/* Suggested Tags */}
              {filteredSuggestions.length > 0 && (
                <div className="space-y-1">
                  {inputValue.trim() && <div className="text-xs text-slate-500 px-2 py-1">Suggestions:</div>}
                  {filteredSuggestions.map((tag, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tag Counter */}
      <p className="text-xs text-slate-500">
        {selectedTags.length}/{maxTags} tags selected
      </p>
    </div>
  )
}
