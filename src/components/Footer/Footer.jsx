import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

export function Footer() {
  const location = useLocation();
  return (
    <div
      className="FooterContainer"
      style={{ display: location?.pathname?.includes("/s") ? "none" : "block" }}
    >
      <div className="FooterHorizontalLine"></div>
      <div className="FooterWrapperContainer">
        <div className="FooterAboutUsContainer">
          <div className="FooterAboutUsHeader">About Us</div>
          <div className="FooterAboutUsText">
            Shop on the go and get anything delivered in minutes. Buy everything
            from groceries to fresh fruits & vegetables, cakes and bakery items,
            to meats & seafood.
          </div>
          <ul className="FooterAboutUsLinks">
            <li>
              <Link
                className="FooterAboutUsLink"
                to="https://twitter.com/khraju123"
                target="_blank"
              >
                <BsTwitter />
              </Link>
            </li>
            <li>
              <Link
                className="FooterAboutUsLink"
                to="https://github.com/KHemanthRaju"
                target="_blank"
              >
                <BsGithub />
              </Link>
            </li>
            <li>
              <Link
                className="FooterAboutUsLink"
                to="https://www.linkedin.com/in/hemanth-raju-aba388176/"
                target="_blank"
              >
                <BsLinkedin />
              </Link>
            </li>
          </ul>
        </div>
        <div className="FooterUsefulLinksContainer">
          <div className="FooterUserfulLinksWrapper">
            <div className="FooterUsefulLinksHeader">Useful Links</div>
            <ul className="FooterUsefulLinks">
              <li className="FooterLink">About</li>
              <li className="FooterLink">Blog</li>
              <li className="FooterLink">Privacy</li>
              <li className="FooterLink">FAQs</li>
            </ul>
          </div>
        </div>
        <div className="FooterNewsLetterContainer">
          <div className="FooterNewsLetterHeader">Newsletter</div>
          <input
            className="FooterNewsLetterinput"
            placeholder="Enter Your Email"
          />
          <div className="FooterNewsLetterbutton">Subscribe</div>
        </div>
      </div>
      <div className="FooterCopyRight">SnapCart © 2023</div>
    </div>
  );
}
