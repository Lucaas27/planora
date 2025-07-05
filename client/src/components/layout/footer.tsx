import { Separator } from "@/components/ui/separator";
// import Twitter from "@/assets/twitter.svg";
// import Twitch from "@/assets/twitch.svg";
import Github from "@/assets/github.svg";

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
        <div className="py-6 flex flex-col-reverse md:flex-row items-center justify-between px-6 xl:px-0">
          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-5 hover:opacity-70">
            <a href="https://github.com/Lucaas27" target="_blank" rel="noopener noreferrer">
              {/* @ts-ignore */}
              <Github className="h-6 w-6 " />
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
