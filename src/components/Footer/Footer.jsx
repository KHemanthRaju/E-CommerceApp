import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <h3 className="footer__copy">
          &#169; 2022 Copyright all right reserved
        </h3>
        <h4>Made with &#9825; Hemanth Raju Koneti</h4>
        <ul className="f-connectme">
          <li>
            <a href="https://github.com/KHemanthRaju" target="_blank">
              <img className="socials-icon" src="./img/github-icon.png"></img>
            </a>
          </li>
          <li>
            <a href="https://medium.com/@rajuhemanth456" target="_blank">
              <img className="socials-icon" src="./img/medium-icon.png"></img>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/hemanth-raju-aba388176/"
              target="_blank"
            >
              <img className="socials-icon" src="./img/linked-icon.png"></img>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export { Footer };
