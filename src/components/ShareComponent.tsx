import React from 'react';
import { FaFacebook, FaTwitter, FaPinterest, FaTelegram } from 'react-icons/fa';

const ShareComponent = () => {
  const shareUrl = window.location.href;
  const productTitle = 'Product Name'; // Replace with the actual product title

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(productTitle)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(productTitle)}`;
    window.open(pinterestUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(productTitle)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="share-component">
      <h3>Share this product:</h3>
      <ul className="share-icons">
        <li>
          <button onClick={shareOnFacebook}>
            <FaFacebook style={{ color: '#3b5998' }} size={24}/>
          </button>
        </li>
        <li>
          <button onClick={shareOnTwitter}>
            <FaTwitter style={{ color: '#1da1f2' }} size={24} />
          </button>
        </li>
        <li>
          <button onClick={shareOnPinterest}>
            <FaPinterest  style={{ color: '#bd081c' }} size={24}/>
          </button>
        </li>
        <li>
          <button onClick={shareOnTelegram} >
            <FaTelegram  size={24} style={{ color: '#0088cc' }}/>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ShareComponent;