import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "./Arrow";
import Block from "./Block";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./Scrolls.css";

const Scrolls = ({ children }) => {
  return (
    <div className="scroll-container">
      <ScrollMenu
        LeftArrow={<Arrow direction="left" />}
        RightArrow={<Arrow direction="right" />}
        wrapperClassName="scroll-menu-wrapper"
      >
        {React.Children.map(children, (child, index) => (
          <Block itemId={index.toString()}>{child}</Block>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default Scrolls;
