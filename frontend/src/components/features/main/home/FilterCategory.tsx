import { Button } from "@/components/ui/button";
import { ARTICLE_PREFERENCES } from "@/constent/Preferences";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useRef } from "react";

function FilterCategory({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const categories = ["Recommended", "All", ...ARTICLE_PREFERENCES];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200; // adjust how much to scroll per click
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-8">
      <Filter className="h-5 w-5 text-slate-400" />

      {/* Left button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Scrollable container */}
      <div ref={scrollRef} className="flex space-x-2 overflow-hidden ">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                : "border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Right button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default FilterCategory;
