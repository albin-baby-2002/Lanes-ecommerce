import SettingsLayout from "@/layouts/settings/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
