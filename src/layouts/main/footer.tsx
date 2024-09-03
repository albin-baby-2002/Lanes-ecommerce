import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGithubSquare,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdOutlineMail } from "react-icons/md";

const companyLinks = [
  { label: "About", href: "/" },
  { label: "Features", href: "/" },
  { label: "Works", href: "/" },
  { label: "Career", href: "/" },
];

const helpLinks = [
  { label: "Customer Support", href: "/" },
  { label: "Delivery Details", href: "/" },
  { label: "Terms & Conditions", href: "/" },
  { label: "Privacy Policy", href: "/" },
];

const faqLinks = [
  { label: "Account", href: "/" },
  { label: "Manage Deliveries", href: "/" },
  { label: "Orders", href: "/" },
  { label: "Payments", href: "/" },
];

const resourcesLinks = [
  { label: "Free eBooks", href: "/" },
  { label: "Development Tutorial", href: "/" },
  { label: "How to - Blog", href: "/" },
  { label: "Youtube Playlist", href: "/" },
];

const payments = ["visa", "mastercard", "paypal", "gpay", "applepay"];

const Footer = () => {
  return (
    <div>
      <div className="flex bg-black py-12 px-20 rounded-3xl  w-[90%] mx-auto justify-between">
        <p className="text-white font-integral_cf text-5xl basis-2/4">STAY UPTO DATE ABOUT OUR LATEST OFFERS</p>

        <div className=" gap-4 grid">
          <div className="flex w-80 items-center gap-3 rounded-full bg-white px-4 py-3">
            <MdOutlineMail color="black" size={"26px"} />
            <input
              className="outline-none placeholder:text-black/40 max-w-52"
              placeholder="Enter your email address  "
            />
          </div>

          <Button className="w-80 h-[50px] rounded-full" variant={"secondary"}>
            Subscrible to Newsletter
          </Button>
        </div>
      </div>

      {/* resource links and socials */}

      <div className="bg-ceramic px-20">
        <div className="flex justify-between border-b py-10">
          <div className="basis-[20%] space-y-6">
            <Image
              src="/logos/lanes.svg"
              height={1000}
              width={1000}
              alt="lanes"
              className="h-6 w-fit"
            />

            <p className="font-normal text-black/60">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>

            <div className="flex gap-2">
              <FaXTwitter />
              <FaFacebook />
              <FaInstagram />
              <FaGithub />
            </div>
          </div>

          <div className="basis-[10%]">
            <h3 className="mb-4 tracking-widest">COMPANY</h3>

            <div>
              {companyLinks.map((link, idx) => {
                return (
                  <FooterLink key={idx} label={link.label} href={link.href} />
                );
              })}
            </div>
          </div>

          <div className="basis-[15%]">
            <h3 className="mb-4 tracking-widest">HELP</h3>

            <div>
              {helpLinks.map((link, idx) => {
                return (
                  <FooterLink key={idx} label={link.label} href={link.href} />
                );
              })}
            </div>
          </div>

          <div className="basis-[15%]">
            <h3 className="mb-4 tracking-widest">FAQ</h3>

            <div>
              {faqLinks.map((link, idx) => {
                return (
                  <FooterLink key={idx} label={link.label} href={link.href} />
                );
              })}
            </div>
          </div>

          <div className="basis-[%]">
            <h3 className="mb-4 tracking-widest">RESOURCES</h3>

            <div>
              {resourcesLinks.map((link, idx) => {
                return (
                  <FooterLink key={idx} label={link.label} href={link.href} />
                );
              })}
            </div>
          </div>
        </div>

        {/* copy rights and payments */}

        <div className="flex justify-between py-4 pb-10 text-sm text-black/60">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>

          <div className="flex">
            {payments.map((val, idx) => {
              return <PaymentImg val={val} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// child components

const FooterLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link className="block py-1 text-black/60" href={href}>
      {label}
    </Link>
  );
};

const PaymentImg = ({ val }: { val: string }) => {
  return (
    <Image
      src={`/logos/payments/${val}.svg`}
      height={1000}
      width={1000}
      alt="patient"
      className="h-12 w-fit"
    />
  );
};
