import { getRedirectUrl } from "@/lib/seo-metadata"

import { Navbar } from "./navbar"

export async function NavbarShell() {
  const redirectUrl = await getRedirectUrl()
  return <Navbar redirectUrl={redirectUrl} />
}
