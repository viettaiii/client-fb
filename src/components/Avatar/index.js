import { Fragment } from "react";
import { Link } from "react-router-dom";

function Avatar({ image = "no-image.webp", alt = "", onClick, className, to }) {
  let Comp = null;
  const agrs = {};
  if (to) {
    Comp = Link;
    agrs.to = to;
  } else {
    Comp = Fragment;
  }
  return (
    <Comp {...agrs}>
      <img
        className={className}
        onClick={onClick}
        src={"/uploads/" + (image ? image : "no-image.webp")}
        alt={alt}
      />
    </Comp>
  );
}

export default Avatar;
