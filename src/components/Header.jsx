import React from "react";

const Header = ({title}) => {
  return (
    <header className="bg-primary bg-gradient position-fixed w-100 p-3 top-0">
      <div className="container">
        <h4 className="text-white text-center p-0 m-0">{title}</h4>
      </div>
    </header>
  );
};

export default Header;
