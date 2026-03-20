import { Reviews } from "./components/Reviews";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

interface ContentItem {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
  type: 'tour' | 'blog';
}

export default function App() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'tour' | 'blog'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.tours || []);
        setLoading(false);
      });
  }, []);

  // Combined Filter Logic: Category + Search
  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-20">
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-6">
        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-100">
          <div className="w-full lg:w-auto">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Explore</h2>
            <p className="text-slate-400 font-medium text-sm">Find your next adventure in Ethiopia</p>
          </div>
          
          <div className="flex flex-col md:flex-row w-full lg:w-auto gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
              <Input 
                placeholder="Search destinations..." 
                className="pl-12 h-12 rounded-2xl border-slate-200 focus-visible:ring-red-600 focus-visible:border-red-600 transition-all bg-slate-50/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Toggle */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 w-full md:w-auto">
              {['all', 'tour', 'blog'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filter === f ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'tour' ? 'Tours' : 'News'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Showing {filteredItems.length} results {searchQuery && `for "${searchQuery}"`}
          </p>
        )}

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => <div key={i} className="h-[450px] bg-slate-50 animate-pulse rounded-[2.5rem]" />)}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-none shadow-none bg-transparent transition-all cursor-pointer" onClick={() => window.open(`https://southethiopiatours.com/${item.slug}`, "_blank")}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-black hover:bg-white border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {item.type}
                  </Badge>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight uppercase">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs font-medium line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-black uppercase text-slate-300 tracking-tighter">No destinations found</h3>
            <p className="text-slate-400">Try adjusting your search or filters.</p>
            <Button variant="link" className="text-red-600 mt-4 font-bold uppercase tracking-widest" onClick={() => {setSearchQuery(""); setFilter('all');}}>
              Clear all filters
            </Button>
          </div>
        )}
      <Reviews />
      </main>
    </div>
  );
}
