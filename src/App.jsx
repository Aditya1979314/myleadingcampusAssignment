import { useState, useEffect, useCallback } from "react";
import { Searchicon } from "./components/Searchicon";

const data = [
    {
       "id": 1,
       "name": "React Query"
    },
    {
       "id": 2,
       "name": "React Hooks"
    },
    {
       "id": 3,
       "name": "React Router"
    },
    {
       "id": 4,
       "name": "React State Management"
    },
    {
       "id": 5,
       "name": "React Performance Optimization"
    },
    {
       "id": 6,
       "name": "React Tutorial"
    },
    {
       "id": 7,
       "name": "React Best Practices"
    },
    {
       "id": 8,
       "name": "React vs Vue"
    },
    {
       "id": 9,
       "name": "React Interview Questions"
    },
    {
       "id": 10,
       "name": "React Roadmap"
    },
    {
       "id": 11,
       "name": "Next.js Server Components"
    },
    {
       "id": 12,
       "name": "Next.js API Routes"
    },
    {
       "id": 13,
       "name": "Next.js Middleware"
    },
    {
       "id": 14,
       "name": "Next.js Authentication"
    },
    {
       "id": 15,
       "name": "Next.js Performance Optimization"
    },
    {
       "id": 16,
       "name": "Next.js Tutorial"
    },
    {
       "id": 17,
       "name": "Next.js vs React"
    },
    {
       "id": 18,
       "name": "Next.js SEO Best Practices"
    },
    {
       "id": 19,
       "name": "Next.js Roadmap"
    },
    {
       "id": 20,
       "name": "Next.js Interview Questions"
    },
    {
       "id": 21,
       "name": "TypeScript Basics"
    },
    {
       "id": 22,
       "name": "TypeScript Interfaces"
    },
    {
       "id": 23,
       "name": "TypeScript Generics"
    },
    {
       "id": 24,
       "name": "TypeScript Utility Types"
    },
    {
       "id": 25,
       "name": "TypeScript vs JavaScript"
    },
    {
       "id": 26,
       "name": "TypeScript Tutorial"
    },
    {
       "id": 27,
       "name": "TypeScript Best Practices"
    },
    {
       "id": 28,
       "name": "TypeScript Roadmap"
    },
    {
       "id": 29,
       "name": "TypeScript Interview Questions"
    },
    {
       "id": 30,
       "name": "TypeScript Performance Optimization"
    },
    {
       "id": 31,
       "name": "Node.js Streams"
    },
    {
       "id": 32,
       "name": "Node.js Event Loop"
    },
    {
       "id": 33,
       "name": "Node.js File System"
    },
    {
       "id": 34,
       "name": "Node.js Authentication"
    },
    {
       "id": 35,
       "name": "Node.js WebSockets"
    },
    {
       "id": 36,
       "name": "Node.js Tutorial"
    },
    {
       "id": 37,
       "name": "Node.js Best Practices"
    },
    {
       "id": 38,
       "name": "Node.js vs Deno"
    },
    {
       "id": 39,
       "name": "Node.js Performance Optimization"
    },
    {
       "id": 40,
       "name": "Node.js Interview Questions"
    },
    {
       "id": 41,
       "name": "Redux Toolkit"
    },
    {
       "id": 42,
       "name": "Redux Middleware"
    },
    {
       "id": 43,
       "name": "Redux Thunk"
    },
    {
       "id": 44,
       "name": "Redux Saga"
    },
    {
       "id": 45,
       "name": "Redux vs Context API"
    },
    {
       "id": 46,
       "name": "Redux Tutorial"
    },
    {
       "id": 47,
       "name": "Redux Best Practices"
    },
    {
       "id": 48,
       "name": "Redux Performance Optimization"
    },
    {
       "id": 49,
       "name": "Redux Interview Questions"
    },
    {
       "id": 50,
       "name": "Redux Roadmap"
    },
    {
       "id": 51,
       "name": "Tailwind CSS Grid"
    },
    {
       "id": 52,
       "name": "Tailwind CSS Flexbox"
    },
    {
       "id": 53,
       "name": "Tailwind CSS Animations"
    },
    {
       "id": 54,
       "name": "Tailwind CSS Responsive Design"
    },
    {
       "id": 55,
       "name": "Tailwind CSS Dark Mode"
    },
    {
       "id": 56,
       "name": "Tailwind CSS Tutorial"
    },
    {
       "id": 57,
       "name": "Tailwind CSS Best Practices"
    },
    {
       "id": 58,
       "name": "Tailwind CSS vs Bootstrap"
    },
    {
       "id": 59,
       "name": "Tailwind CSS Performance Optimization"
    },
    {
       "id": 60,
       "name": "Tailwind CSS Interview Questions"
    }
 ];

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false); 


    const debounce = (func, delay) => {
        let timer;
        return (searchTerm) => {
            clearTimeout(timer);
            setLoading(true);
            setShowResults(false);
            timer = setTimeout(() => {
                func(searchTerm);
                setLoading(false);
                setShowResults(true);
            }, delay);
        };
    };

 
    const handleSearch = useCallback(
        debounce((searchTerm) => {
            if (!searchTerm) {
                setFilteredData([]); 
            } else {
                const results = data.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredData(results);
            }
        }, 500),
        []
    );

    useEffect(() => {
        handleSearch(query);
    }, [query, handleSearch]);

    return (
        <div className="p-4 max-w-lg mx-auto h-screen">
          <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">SearchPro</h1>

            <input
                type="text"
                className="w-full p-2 border rounded-full"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <p className="mt-2 text-gray-500">Loading...</p>}

          
            {!loading && showResults && (
                <ul className="mt-4 mb-4 shadow-md max-h-96 overflow-y-auto py-2 px-1 rounded-md">
                    {filteredData.length > 0 ? (
                        filteredData.map(item => (
                            <li key={item.id} className="p-2 flex gap-3"><span><Searchicon/></span><span className="text-blue-400">{item.name}</span></li>
                        ))
                    ) : (
                        <p className="mt-2 text-red-500">No results found</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
