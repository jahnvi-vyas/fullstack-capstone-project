import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const gifts = [
  {
    id: 1,
    title: 'Personalized Gift Box',
    category: 'Birthday',
    description: 'A beautiful collection of personalized gifts for someone special.',
    price: '$49.99',
    emoji: '🎁',
  },
  {
    id: 2,
    title: 'Luxury Self Care Kit',
    category: 'Wellness',
    description: 'A relaxing collection designed for comfort and self-care.',
    price: '$39.99',
    emoji: '🧴',
  },
  {
    id: 3,
    title: 'Premium Coffee Set',
    category: 'Lifestyle',
    description: 'A premium coffee experience for coffee lovers.',
    price: '$34.99',
    emoji: '☕',
  },
  {
    id: 4,
    title: 'Creative Art Kit',
    category: 'Creative',
    description: 'A fun and creative gift set for artists and creators.',
    price: '$29.99',
    emoji: '🎨',
  },
  {
    id: 5,
    title: 'Elegant Watch',
    category: 'Fashion',
    description: 'A timeless accessory for every special occasion.',
    price: '$89.99',
    emoji: '⌚',
  },
  {
    id: 6,
    title: 'Travel Essentials',
    category: 'Travel',
    description: 'Useful travel accessories packed into one thoughtful gift.',
    price: '$44.99',
    emoji: '✈️',
  },
];

const categories = [
  { name: 'Birthday', icon: '🎂' },
  { name: 'Wellness', icon: '🌿' },
  { name: 'Fashion', icon: '✨' },
  { name: 'Lifestyle', icon: '☕' },
  { name: 'Travel', icon: '✈️' },
];

export default function MainPage() {
  return (
    <div className="main-page">

      {/* Hero */}
      <section className="main-hero">
        <div className="hero-content">
          <span className="hero-label">GIFTING MADE SIMPLE</span>

          <h1>
            Find something
            <br />
            <span>meaningful.</span>
          </h1>

          <p>
            Discover thoughtful gifts for every person,
            occasion and moment that matters.
          </p>

          <div className="hero-actions">
            <Link to="/app/search" className="primary-action">
              Explore Gifts
              <span>→</span>
            </Link>

            <Link to="/app/search" className="secondary-action">
              Browse categories
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="hero-gift-card">
            <div className="hero-gift-icon">🎁</div>
            <span>Thoughtful</span>
            <strong>Gifts</strong>
          </div>

          <div className="floating-card floating-card-one">
            <span>✨</span>
            <div>
              <strong>Special moments</strong>
              <small>Made memorable</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>❤️</span>
            <div>
              <strong>Made with care</strong>
              <small>For someone special</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="category-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>Shop by occasion</h2>
          </div>

          <Link to="/app/search">View all →</Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/app/search?category=${category.name}`}
              className="category-card"
              key={category.name}
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <span>{category.name}</span>

              <small>Explore gifts →</small>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Gifts */}
      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span>OUR PICKS</span>
            <h2>Featured gifts</h2>
          </div>

          <Link to="/app/search">See all gifts →</Link>
        </div>

        <div className="gift-grid">
          {gifts.map((gift) => (
            <div className="gift-card" key={gift.id}>

              <div className="gift-image">
                <span>{gift.emoji}</span>

                <button
                  className="favorite-button"
                  aria-label="Add to favorites"
                >
                  ♡
                </button>

                <span className="gift-category">
                  {gift.category}
                </span>
              </div>

              <div className="gift-content">
                <h3>{gift.title}</h3>

                <p>{gift.description}</p>

                <div className="gift-footer">
                  <strong>{gift.price}</strong>
                    <Link
                        to={`/app/product/${gift._id}`}
                        className="view-gift-btn"
                    >
                        View Gift
                    </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="main-cta">
        <div>
          <span>CAN'T DECIDE?</span>

          <h2>
            Let us help you find
            <br />
            the perfect gift.
          </h2>

          <p>
            Search by occasion, interest or gift type
            and discover something they'll love.
          </p>
        </div>

        <Link to="/app/search" className="cta-button">
          Find a gift →
        </Link>
      </section>

    </div>
  );
}