import Lottie from "lottie-react";
import React from "react";
import spinnerAnimation from "public/images/common/spinner.json";

export default function CssLoader() {
  return (
    <Lottie className="size-20" animationData={spinnerAnimation} loop={true} />
  );
}
