import React from 'react';

// --- Icon Definitions using Lucide SVGs (Inline) ---

const SearchIcon = ({ className = "w-5 h-5 text-gray-500" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4 ml-1" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

const ListFilterIcon = ({ className = "w-5 h-5 text-black" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 10h18"/><path d="M7 6h10"/><path d="M9 14h6"/><path d="M12 18h0"/></svg>
);

const TwitterIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.5-1.4 2.3-3.1 2.4-5.2s-.7-3.2-2.3-4.5c.2-.5 1-1.2 2-2 1.4-1.1 2.8-1.7 4.5-1.7s3.1.5 4.5 1.7c.3-.3.6-.6.9-.9.4-.4.8-.8 1.3-1.2"/></svg>
);

const FacebookIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);


// --- Reusable Tailwind Classes (CSS was provided in HTML) ---

const filterDropdownClass = "flex items-center border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer transition duration-150 ease-in-out hover:bg-gray-50";
const filterTabClass = "px-3 py-2 text-sm font-semibold cursor-pointer transition duration-150 ease-in-out hover:text-black hover:bg-gray-100 rounded-lg text-gray-700";


// --- Main App Component ---

const App = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            
            {/* Header / Navbar */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    
                    {/* Logo */}
                    <div className="flex items-center space-x-1">
                        <span className="text-xs font-bold mr-1 tracking-widest text-gray-700">SHOP</span>
                        <span className="text-2xl font-extrabold text-black">Devset.io</span>
                    </div>

                    {/* Search and Login */}
                    <div className="flex items-center">
                        {/* Search Input Group */}
                        <div className="relative w-96 max-w-sm md:max-w-md lg:max-w-lg hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-black transition duration-150">
                            <input 
                                type="text" 
                                placeholder="search for games, jams, tags, or creators" 
                                className="w-full px-4 py-2 text-sm focus:outline-none"
                            />
                            <button className="bg-white p-2 hover:bg-gray-50">
                                <SearchIcon />
                            </button>
                        </div>
                        
                        {/* Log in Button */}
                        <button className="ml-4 px-4 py-2 border border-black rounded-lg text-sm font-semibold hover:bg-gray-50 transition duration-150">
                            Log in
                        </button>
                    </div>
                </div>
            </header>

            {/* Filter Bar / Sub-Navigation */}
            <nav className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center space-x-4 md:space-x-6">
                    
                    {/* Filter Icon (Leftmost element) */}
                    <div className="mr-2">
                        <ListFilterIcon />
                    </div>
                    
                    {/* Filter Dropdowns */}
                    <div className="flex items-center space-x-3">
                        <div className={filterDropdownClass}>
                            Tagged <ChevronDownIcon />
                        </div>
                        <div className={filterDropdownClass}>
                            Type <ChevronDownIcon />
                        </div>
                        <span className="text-xs text-gray-500 hidden sm:block">(2 results)</span>
                    </div>

                    {/* Tabs/Links */}
                    <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
                        <div className={`${filterTabClass} text-black font-extrabold`}>Popular</div>
                        <div className={filterTabClass}>Recently Published</div>
                        <div className={filterTabClass}>Top Rated</div>
                        <div className={`${filterDropdownClass} bg-white border-none hover:bg-gray-100`}>
                            Price Range <ChevronDownIcon />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area Placeholder */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Amazing Projects</h2>
                <p className="text-gray-600 mb-8">This is where the list of games/projects would appear. The rest of the design elements are in place.</p>
                
                {/* Large empty space to mimic the image */}
                <div className="h-96 w-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                    [Content Area: Games, Jams, or Assets List Goes Here]
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
                    
                    {/* Social Icons */}
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-500 hover:text-black transition duration-150">
                            <TwitterIcon className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-black transition duration-150">
                            <FacebookIcon className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center space-x-6 text-sm font-semibold text-gray-700 mb-4">
                        <a href="#" className="hover:text-black transition duration-150">ABOUT</a>
                        <a href="#" className="hover:text-black transition duration-150">FAQ</a>
                        <a href="#" className="hover:text-black transition duration-150">BLOG</a>
                        <a href="#" className="hover:text-black transition duration-150">CONTACT US</a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-gray-500">
                        Copyright © Devset corp
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
