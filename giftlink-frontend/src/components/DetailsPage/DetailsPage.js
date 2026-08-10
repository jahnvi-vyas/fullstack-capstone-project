import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './DetailsPage.css';

const gifts = {
  1: {
    title: 'Personalized Gift Box',
    category: 'Birthday',
    price: '$49.99',
    emoji: '🎁',
    description:
      'A beautiful personalized gift box carefully created for someone special. Make their day memorable with a thoughtful collection of gifts.',
    features: [
      'Personalized gift selection',
      'Premium packaging',
      'Perfect for birthdays',
      'Ready to gift',
    ],
  },

  2: {
    title: 'Luxury Self Care Kit',
    category: 'Wellness',
    price: '$39.99',
    emoji: '🧴',
    description:
      'A relaxing collection designed for comfort, wellness and self-care. A thoughtful choice for someone who deserves a little time for themselves.',
    features: [
      'Premium self-care products',
      'Relaxation focused',
      'Beautiful presentation',
      'Perfect wellness gift',
    ],
  },

  3: {
    title: 'Premium Coffee Set',
    category: 'Lifestyle',
    price: '$34.99',
    emoji: '☕',
    description:
      'A premium coffee experience for coffee lovers. A simple yet thoughtful gift for everyday moments.',
    features: [
      'Premium coffee selection',
      'Elegant packaging',
      'Perfect for coffee lovers',
      'Everyday lifestyle gift',
    ],
  },

  4: {
    title: 'Creative Art Kit',
    category: 'Creative',
    price: '$29.99',
    emoji: '🎨',
    description:
      'A creative gift set designed for artists, creators and anyone who enjoys exploring their imagination.',
    features: [
      'Creative supplies',
      'Great for beginners',
      'Fun and engaging',
      'Perfect creative gift',
    ],
  },
};

export default function DetailsPage() {
  const { id } = useParams();

  const gift = gifts[id] || gifts[1];

  return (
    <div className="details-page">

      <div className="details-container">

        {/* Breadcrumb */}
        <div className="details-breadcrumb">
          <Link to="/app">Home</Link>
          <span>›</span>
          <Link to="/app/search">Gifts</Link>
          <span>›</span>
          <strong>{gift.title}</strong>
        </div>

        {/* Main Product */}
        <section className="details-card">

          {/* Image */}
          <div className="details-image-section">

            <div className="details-image">
              <span>{gift.emoji}</span>

              <button className="details-favorite">
                ♡
              </button>
            </div>

            <div className="details-thumbnails">
              <div className="thumbnail active">
                {gift.emoji}
              </div>

              <div className="thumbnail">
                ✨
              </div>

              <div className="thumbnail">
                🎀
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="details-info">

            <span className="details-category">
              {gift.category}
            </span>

            <h1>{gift.title}</h1>

            <div className="details-rating">
              <span>★★★★★</span>
              <small>4.9 · 24 reviews</small>
            </div>

            <div className="details-price">
              {gift.price}
            </div>

            <p className="details-description">
              {gift.description}
            </p>

            <div className="details-divider"></div>

            <div className="details-features">
              <h3>What's included</h3>

              {gift.features.map((feature) => (
                <div
                  className="detail-feature"
                  key={feature}
                >
                  <span>✓</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <div className="details-actions">
              <button className="gift-primary-button">
                Add to wishlist
                <span>♡</span>
              </button>

              <button className="gift-secondary-button">
                Share
                <span>↗</span>
              </button>
            </div>

            <div className="details-note">
              <span>✓</span>
              <div>
                <strong>A thoughtful choice</strong>
                <p>
                  Selected to make your special moments
                  more memorable.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Information */}
        <section className="details-bottom">

          <div>
            <span className="bottom-icon">🎁</span>

            <div>
              <h3>Thoughtfully selected</h3>
              <p>
                Every GiftLink item is selected with
                meaningful moments in mind.
              </p>
            </div>
          </div>

          <div>
            <span className="bottom-icon">✨</span>

            <div>
              <h3>Perfect for gifting</h3>
              <p>
                Beautiful choices for birthdays,
                celebrations and everyday moments.
              </p>
            </div>
          </div>

          <div>
            <span className="bottom-icon">❤️</span>

            <div>
              <h3>Made with care</h3>
              <p>
                Discover gifts that communicate
                thoughtfulness and appreciation.
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}