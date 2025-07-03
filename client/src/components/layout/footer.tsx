import { Separator } from "@/components/ui/separator";
// import Twitter from "@/assets/twitter.svg";
// import Twitch from "@/assets/twitch.svg";
import Github from "@/assets/github.svg?react";

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Activities",
    href: "/activities",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Privacy",
    href: "/privacy",
  },
];

function Footer() {
  const links = footerLinks.map(({ title, href }) => (
    <li key={title}>
      <a href={href} className="text-muted-foreground hover:text-foreground font-medium">
        {title}
      </a>
    </li>
  ));
  return (
    <footer>
      <Separator />
      <div className="container max-w-7xl mx-auto px-4">
        <div className="py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-5 text-muted-foreground">
            <a href="https://github.com/Lucaas27" target="_blank" rel="noopener noreferrer">
              <Github width={24} height={24} />
            </a>
          </div>
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <a href="/" target="_blank" rel="noopener">
              Planora
            </a>
            . All rights reserved.
          </span>
          {/* Footer Links */}
          <ul className="flex items-center justify-center gap-4 flex-wrap">{links}</ul>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
