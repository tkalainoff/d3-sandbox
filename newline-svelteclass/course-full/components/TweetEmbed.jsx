import { useEffect } from "react";

export default function TweetEmbed(props) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return props.children;
}
