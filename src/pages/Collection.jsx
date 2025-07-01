import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import SearchBar from '../components/SearchBar';

const Collection = () => {
  const { products, search, showSearch, setSearch, setShowSearch } = useContext(ShopContext);

  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(2000);
  const itemsPerPage = 12;

  const handleSubCategoryToggle = (e) => {
    const value = e.target.value;
    setSubCategoryFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setCurrentPage(1);
  };

  // Function to interleave arrays for better mixing
  const interleaveArrays = (arrays) => {
    const result = [];
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    
    for (let i = 0; i < maxLength; i++) {
      arrays.forEach(arr => {
        if (i < arr.length) {
          result.push(arr[i]);
        }
      });
    }
    return result;
  };

  useEffect(() => {
    let temp = products.filter((item) => item && item.name && item.image);

    if (showSearch && search) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subCategoryFilter.length > 0) {
      if (subCategoryFilter.length === 1) {
        // Single filter - normal filtering
        temp = temp.filter((item) =>
          subCategoryFilter.some(
            (selected) =>
              selected.toLowerCase() === item.subCategory?.toLowerCase()
          )
        );
      } else {
        // Multiple filters - collect products for each filter separately and interleave
        const filterGroups = subCategoryFilter.map(selectedFilter => 
          temp.filter((item) =>
            selectedFilter.toLowerCase() === item.subCategory?.toLowerCase()
          )
        );
        
        // Remove duplicates while preserving the interleaved order
        const interleaved = interleaveArrays(filterGroups);
        const seen = new Set();
        temp = interleaved.filter(item => {
          if (seen.has(item._id)) {
            return false;
          }
          seen.add(item._id);
          return true;
        });
      }
    }

    temp = temp.filter((item) => item.price <= maxPrice);

    // Apply sorting
    if (sortType === 'low-high') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [products, search, showSearch, subCategoryFilter, sortType, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Top horizontal line */}
      <div className="h-[1px] bg-gray-200 w-full"></div>

      {showSearch && (
        <SearchBar
          onClose={() => {
            setShowSearch(false);
            setSearch('');
          }}
        />
      )}

      <div className="flex flex-col lg:flex-row px-4 sm:px-0 py-6 gap-8 pb-14">
        {/* Filter Sidebar */}
        <div className="w-full sm:w-[240px] border border-gray-200 rounded p-4 h-fit bg-white">
          <p className="mb-4 text-lg font-semibold flex items-center gap-2">
            FILTERS
            <img src={assets.dropdown_icon} alt="dropdown" className="h-3" />
          </p>

          {/* SubCategory Filter */}
          <p className="mb-2 text-sm font-semibold">PRODUCT TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700 mb-5">
            {['Lipstick', 'Lip Balm', 'Moisturizer', 'Hair Shampoo', 'Conditioner'].map((type) => (
              <label className="flex gap-2 items-center" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  onChange={handleSubCategoryToggle}
                  className="w-4 h-4 accent-black"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <p className="mb-2 text-lg font-semibold">PRICE (Below ₹{maxPrice})</p>
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-base sm:text-lg mb-4 gap-3">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <select
              className="border border-gray-300 text-sm px-3 py-1 rounded"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {paginatedProducts.map((item, index) => (
              <ProductItem
                key={item._id || index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={Array.isArray(item.image) ? item.image[0] : item.image}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="border px-3 py-1 rounded hover:bg-black hover:text-white disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`border px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border px-3 py-1 rounded hover:bg-black hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;