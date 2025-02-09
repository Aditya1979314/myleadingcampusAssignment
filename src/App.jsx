import { useState, useEffect, useCallback } from "react";
import { Searchicon } from "./components/Searchicon";
import { data } from "./components/Data";
import { Close } from "./components/Close";


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
        }, 300),
        []
    );

    useEffect(() => {
        handleSearch(query);
    }, [query, handleSearch]);

    const highlightMatch = (name, query) => {
        if (!query) return name;
    
        const regex = new RegExp(`(${query})`, "gi");
        const parts = name.split(regex); 
    
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="font-bold">{part}</span> 
            ) : (
                part
            )
        );
    };

    return (
        <div className="p-4 max-w-lg mx-auto h-screen">
          <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">SearchPro</h1>

            <div className="relative">
            <div className="absolute top-3 left-1"><Searchicon/></div>
            <input
                type="text"
                className="w-full py-2 px-8 border rounded-full"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="absolute top-4 right-3" onClick={()=>{
                setQuery("");
            }}><Close/></button>
            </div>
             
            {loading && <p className="mt-2 text-gray-500">Loading...</p>}

          
            {!loading && showResults && (
                <ul className={`mt-4 mb-4 ${filteredData.length>0 && 'shadow-md'} max-h-96 overflow-y-auto py-2 px-1 rounded-md`}>
                     {filteredData.length > 0 ? (
        filteredData.map((item) => (
            <li key={item.id} className="p-2 flex gap-3">
                <span><Searchicon /></span>
                <span className="text-blue-400">{highlightMatch(item.name, query)}</span>
            </li>
        ))
    ) : (
        query && <p className="mt-2 text-red-500">No results found</p>
    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
