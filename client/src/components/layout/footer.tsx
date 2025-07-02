import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";
import Twitter from "@/assets/twitter.svg";
import Twitch from "@/assets/twitch.svg";
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
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            {/* Logo */}
            <a
              href="/"
              className="flex justify-center items-center gap-2 text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text font-semibold hover:opacity-80 transition-opacity duration-200"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl tracking-tighter">Planora</span>
            </a>
            {/* Footer Links */}
            <ul className="mt-6 flex items-center gap-4 flex-wrap">{links}</ul>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <a href="/" target="_blank" rel="noopener">
                Planora
              </a>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
              <a href="https://twitch.tv/" target="_blank" rel="noopener noreferrer">
                <Twitch />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <Github />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { Footer };
