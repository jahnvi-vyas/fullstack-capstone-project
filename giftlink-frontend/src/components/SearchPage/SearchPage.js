import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const gifts = [
  {
    id: 1,
    title: 'Personalized Gift Box',
    category: 'Birthday',
    price: 49.99,
    emoji: '🎁',
    description: 'A thoughtful personalized gift box for someone special.',
  },
  {
    id: 2,
    title: 'Luxury Self Care Kit',
    category: 'Wellness',
    price: 39.99,
    emoji: '🧴',
    description: 'A relaxing collection created for comfort and self-care.',
  },
  {
    id: 3,
    title: 'Premium Coffee Set',
    category: 'Lifestyle',
    price: 34.99,
    emoji: '☕',
    description: 'A premium coffee experience for coffee lovers.',
  },
  {
    id: 4,
    title: 'Creative Art Kit',
    category: 'Creative',
    price: 29.99,
    emoji: '🎨',
    description: 'Everything needed to explore creativity.',
  },
  {
    id: 5,
    title: 'Elegant Watch',
    category: 'Fashion',
    price: 89.99,
    emoji: '⌚',
    description: 'A timeless accessory for every special occasion.',
  },
  {
    id: 6,
    title: 'Travel Essentials',
    category: 'Travel',
    price: 44.99,
    emoji: '✈️',
    description: 'Useful travel accessories in one beautiful set.',
  },
  {
    id: 7,
    title: 'Wellness Journal',
    category: 'Wellness',
    price: 24.99,
    emoji: '📔',
    description: 'A beautiful journal for mindful daily routines.',
  },
  {
    id: 8,
    title: 'Classic Perfume',
    category: 'Fashion',
    price: 64.99,
    emoji: '🌸',
    description: 'An elegant fragrance for everyday moments.',
  },
];

const categories = [
  'All',
  'Birthday',
  'Wellness',
  'Lifestyle',
  'Creative',
  'Fashion',
  'Travel',
];

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');

  const filteredGifts = useMemo(() => {
    let result = gifts.filter((gift) => {
      const matchesSearch =
        gift.title.toLowerCase().includes(search.toLowerCase()) ||
        gift.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' || gift.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === 'low') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === 'high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="search-page">

      <section className="search-header">
        <div>
          <span>DISCOVER SOMETHING SPECIAL</span>
          <h1>Find the perfect gift</h1>
          <p>
            Search through thoughtful gifts for every person
            and occasion.
          </p>
        </div>
      </section>

      <main className="search-content">

        {/* Search Box */}
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search gifts, occasions or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch('')}>
              ×
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="search-toolbar">

          <div className="category-filters">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? 'active' : ''
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
          </select>

        </div>

        {/* Result Header */}
        <div className="result-header">
          <div>
            <strong>{filteredGifts.length}</strong>
            <span> gifts found</span>
          </div>

          {search && (
            <span>
              Results for "{search}"
            </span>
          )}
        </div>

        {/* Results */}
        {filteredGifts.length > 0 ? (
          <div className="search-grid">

            {filteredGifts.map((gift) => (
              <div className="search-gift-card" key={gift.id}>

                <div className="search-gift-image">
                  <span>{gift.emoji}</span>

                  <button className="search-heart">
                    ♡
                  </button>

                  <small>{gift.category}</small>
                </div>

                <div className="search-gift-body">
                  <h3>{gift.title}</h3>

                  <p>{gift.description}</p>

                  <div className="search-gift-footer">
                    <strong>
                      ${gift.price.toFixed(2)}
                    </strong>

                    <Link
                      to={`/app/details/${gift.id}`}
                    >
                      View details →
                    </Link>
                  </div>
                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="no-results">
            <div>🔎</div>

            <h3>No gifts found</h3>

            <p>
              Try a different search term or category.
            </p>

            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}