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
  // console.log("ShareComponent", url, shareUrl, imageUrl, title);

  const shareOnFacebook = (title:string, imageUrl:string) => {
    const imageUrlLocal = encodeURIComponent(imageUrl);
    const titleLocal = encodeURIComponent(title);
    const description = encodeURIComponent("Description here");
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://engroovers.com/product/6128903880859&picture=${imageUrlLocal}&title=${titleLocal}&description=${description}`;
    window.open(shareUrl, "_blank", "noopener noreferrer");
  };


  console.log(`ShareComponent --- https://www.facebook.com/sharer/sharer.php?u=https://engroovers.com/product/6128903880859&picture=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent("description")}`)
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
          {/* <FacebookShareButton url={shareUrl} title={title}>
            <FaFacebook style={{ color: "#3b5998" }} size={24} />
          </FacebookShareButton>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https://engroovers.com/product/6128903880859&picture=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent("description")}`} target="_blank" rel="noopener noreferrer">
            Share on Facebook
          </a> */}
          <button onClick={()=>shareOnFacebook(title, imageUrl)}>Share on Facebook</button>
        </li>
        <li>
          <TwitterShareButton url={shareUrl} title={title}>
            <FaTwitter style={{ color: "#1da1f2" }} size={24} />
          </TwitterShareButton>
        </li>
        <li>
          <PinterestShareButton url={shareUrl} media={imageUrl}>
            <FaPinterest style={{ color: "#bd081c" }} size={24} />
          </PinterestShareButton>
        </li>
        <li>
          <TelegramShareButton url={shareUrl} title={title}>
            <FaTelegram size={24} style={{ color: "#0088cc" }} />
          </TelegramShareButton>
        </li>
        <a href={`https://www.pinterest.com/pin/create/button/?url=https://engroovers.com/product/6128903880859&media=${imageUrl}&description=${title}`}>Share on Pinterest</a>
      </ul>
    </div>
  );
};

export default ShareComponent;
