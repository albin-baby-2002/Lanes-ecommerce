import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

//--------------------------------------------------

const links = {
  company: [
    { label: "About", href: "/" },
    { label: "Features", href: "/" },
    { label: "Works", href: "/" },
    { label: "Career", href: "/" },
  ],
  help: [
    { label: "Customer Support", href: "/" },
    { label: "Delivery Details", href: "/" },
    { label: "Terms & Conditions", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
  faq: [
    { label: "Account", href: "/" },
    { label: "Manage Deliveries", href: "/" },
    { label: "Orders", href: "/" },
    { label: "Payments", href: "/" },
  ],
  resources: [
    { label: "Free eBooks", href: "/" },
    { label: "Development Tutorial", href: "/" },
    { label: "How to - Blog", href: "/" },
    { label: "Youtube Playlist", href: "/" },
  ],
};


const payments = ["visa", "mastercard", "paypal", "gpay", "applepay"];

//--------------------------------------------------

// main component

const Footer = () => {
  return (
    <div className="mt-10">
      <SubscribeSection />
      <ResourceLinksAndSocials />
      <CopyRightsAndPayments />
    </div>
  );
};

//--------------------------------------------------

// sub-components

const SubscribeSection = () => (
  <div className="relative">
    <div className="absolute inset-0 top-2/4 -z-10 bg-ceramic"></div>
    <div className="mx-auto flex w-[90%] flex-col justify-between gap-6 rounded-3xl bg-black px-8 py-12 md:flex-row md:px-10 lg:gap-0 lg:px-16">
      <p className="basis-3/5 font-integral_cf text-[36px] text-white md:text-[30px] lg:text-[36px]">
        STAY UPTO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex flex-col gap-4 md:mt-3">
        <div className="flex items-center gap-3 rounded-full bg-white p-2 px-4 lg:w-72">
          <MdOutlineMail color="black" size={"22px"} />
          <input
            className="max-w-52 text-sm outline-none placeholder:text-black/40"
            placeholder="Enter your email address  "
          />
        </div>
        <Button className="h-[42px] rounded-full lg:w-72" variant={"secondary"}>
          Subscribe to Newsletter
        </Button>
      </div>
    </div>
  </div>
);

//--------------------------------------------------

const ResourceLinksAndSocials = () => (
  <div className="bg-ceramic px-10 lg:px-14 xl:px-20">
    <div className="flex flex-col justify-between gap-y-4 border-b py-10 lg:flex-row">
      <Socials />
      <Links />
    </div>
  </div>
);

//--------------------------------------------------

const Socials = () => (
  <div className="space-y-6 sm:max-w-[80%] md:max-w-[50%] lg:max-w-none lg:basis-[30%] xl:basis-[20%]">
    <Link href={"/"}>
      <Image
        src="/logos/lanes.svg"
        height={1000}
        width={1000}
        alt="lanes"
        className="h-6 w-fit"
      />
    </Link>
    <p className="font-normal text-black/60">
      We have clothes that suits your style and which you’re proud to wear. From
      women to men.
    </p>
    <div className="flex gap-2">
      <FaXTwitter />
      <FaFacebook />
      <FaInstagram />
      <FaGithub />
    </div>
  </div>
);

//--------------------------------------------------

const Links = () => (
  <div className="grid grid-cols-2 gap-y-4 lg:flex lg:basis-[60%] lg:justify-between xl:basis-[70%]">
    {Object.entries(links).map(([category, links]) => (
      <div key={category} className="basis-[15%]">
        <h3 className="mb-4 tracking-widest">{category.toUpperCase()}</h3>
        <div>
          {links.map((link, idx) => (
            <FooterLink key={idx} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

//--------------------------------------------------

const CopyRightsAndPayments = () => (
  <div className="flex flex-col justify-center gap-y-4 py-4 pb-10 text-center text-sm text-black/60 md:flex-row md:items-center md:justify-between">
    <p>Shop.co © 2000-2023, All Rights Reserved</p>
    <div className="flex justify-center">
      {payments.map((val, idx) => (
        <PaymentImg key={idx} val={val} />
      ))}
    </div>
  </div>
);

//--------------------------------------------------

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <Link className="block py-1 text-black/60" href={href}>
    {label}
  </Link>
);

//--------------------------------------------------

const PaymentImg = ({ val }: { val: string }) => (
  <Image
    src={`/logos/payments/${val}.svg`}
    height={1000}
    width={1000}
    alt="payment"
    className="h-12 w-fit"
  />
);

export default Footer;
