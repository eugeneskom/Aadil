import React from "react";
import { FaFacebook, FaTwitter, FaPinterest, FaTelegram } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, PinterestShareButton, TelegramShareButton } from "react-share";
import { Helmet } from "react-helmet-async";

interface ShareComponentProps {
  title: string;
  imageUrl: string;
  url: string;
}

const ShareComponent = ({ title, imageUrl, url }: ShareComponentProps) => {
  const shareUrl = window.location.href;
  console.log('ShareComponent', url, shareUrl, imageUrl, title)
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&picture=${encodeURIComponent(imageUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}&image=${encodeURIComponent(imageUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(imageUrl)}`;
    window.open(pinterestUrl, "_blank");
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}&image=${encodeURIComponent(imageUrl)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="share-component">
       <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      <h3>Share this product:</h3>
      <ul className="share-icons">
        <li>
          <FacebookShareButton url={shareUrl} title={title}>
            <FaFacebook style={{ color: "#3b5998" }} size={24} />
          </FacebookShareButton>

          {/* <button onClick={shareOnFacebook}>
            <FaFacebook style={{ color: '#3b5998' }} size={24} />
          </button> */}
        </li>
        <li>
          <TwitterShareButton url={shareUrl} title={title}>
            <FaTwitter style={{ color: "#1da1f2" }} size={24} />
          </TwitterShareButton>
          {/* <button onClick={shareOnTwitter}>
            <FaTwitter style={{ color: '#1da1f2' }} size={24} />
          </button> */}
        </li>
        <li>
          <PinterestShareButton url={shareUrl} media={imageUrl}>
            <FaPinterest style={{ color: "#bd081c" }} size={24} />
          </PinterestShareButton>
          {/* <button onClick={shareOnPinterest}>
            <FaPinterest style={{ color: '#bd081c' }} size={24} />
          </button> */}
        </li>
        <li>
          <TelegramShareButton url={shareUrl} title={title}>
            <FaTelegram size={24} style={{ color: "#0088cc" }} />
          </TelegramShareButton>

          {/* <button onClick={shareOnTelegram}>
            <FaTelegram size={24} style={{ color: "#0088cc" }} />
          </button> */}
        </li>
      </ul>
    </div>
  );
};

export default ShareComponent;
