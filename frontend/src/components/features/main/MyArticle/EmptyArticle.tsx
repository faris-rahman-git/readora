import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyArticle({ searchQuery }: { searchQuery: string }) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-slate-400 text-center">
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-sm mb-4">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Start creating your first article"}
          </p>
          <Link to="/create-article">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmptyArticle;
