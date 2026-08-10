import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import urlConfig from '../../config/urlConfig';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);

    const categories = [
        'Electronics',
        'Clothing',
        'Books',
        'Toys',
        'Home',
        'Beauty',
        'Sports',
        'Other'
    ];

    const conditions = [
        'New',
        'Like New',
        'Good',
        'Fair',
        'Used'
    ];

    const navigate = useNavigate();

    const handleSearch = async () => {
        const category = document.getElementById('categorySelect').value;
        const condition = document.getElementById('conditionSelect').value;

        const baseUrl = `${urlConfig.backendUrl}/api/search?`;

        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: category,
            condition: condition
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
            setSearchResults([]);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="search-page container mt-5">
            <h2 className="text-center mb-4">Search Gifts</h2>

            <div className="search-form">
                <div className="search-input-row">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search gifts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-primary search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                <div className="filters mt-4">
                    <div className="filter-group">
                        <label htmlFor="categorySelect">
                            Category
                        </label>

                        <select
                            id="categorySelect"
                            className="form-control"
                        >
                            <option value="">All</option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="conditionSelect">
                            Condition
                        </label>

                        <select
                            id="conditionSelect"
                            className="form-control"
                        >
                            <option value="">All</option>

                            {conditions.map((condition) => (
                                <option
                                    key={condition}
                                    value={condition}
                                >
                                    {condition}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="ageRange">
                            Less than {ageRange} years
                        </label>

                        <input
                            type="range"
                            className="form-control-range"
                            id="ageRange"
                            min="1"
                            max="10"
                            value={ageRange}
                            onChange={(e) =>
                                setAgeRange(e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="search-results mt-4">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <div
                            key={product.id}
                            className="card mb-3 search-result-card"
                        >
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-img-top"
                                />
                            ) : (
                                <div className="no-image">
                                    No Image Available
                                </div>
                            )}

                            <div className="card-body">
                                <h5 className="card-title">
                                    {product.name}
                                </h5>

                                <p className="card-text">
                                    {product.description
                                        ? `${product.description.slice(0, 100)}...`
                                        : 'No description available.'}
                                </p>
                            </div>

                            <div className="card-footer">
                                <button
                                    onClick={() =>
                                        goToDetailsPage(product.id)
                                    }
                                    className="btn btn-primary"
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div
                        className="no-products"
                        role="alert"
                    >
                        No products found. Please revise your filters.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;