import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

const destinations: { title: string; href: string; description: string }[] = [
  {
    title: "Omo Valley",
    href: "https://southethiopiatours.com/omo-valley-tours/",
    description: "Deep cultural immersion with the diverse tribes of Southern Ethiopia.",
  },
  {
    title: "Danakil Depression",
    href: "https://southethiopiatours.com/danakil-depression-tours/",
    description: "Expeditions to Erta Ale volcano and the otherworldly salt lakes.",
  },
  {
    title: "Bale Mountains",
    href: "https://southethiopiatours.com/bale-mountains-trekking/",
    description: "Trekking through afro-alpine plateaus and spotting endemic wolves.",
  },
  {
    title: "Simien Mountains",
    href: "https://southethiopiatours.com/simien-mountains-trekking/",
    description: "Dramatic landscapes and Gelada baboons in the 'Roof of Africa'.",
  },
]

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="flex items-center gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-6 py-2 pointer-events-auto transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
        
        {/* Brand Mark */}
        <div 
          className="flex items-center gap-2 cursor-pointer pr-4 border-r border-slate-200"
          onClick={() => window.location.href = '/'}
        >
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-sm">S</div>
          <span className="font-black text-sm tracking-tighter uppercase hidden sm:inline-block">South Ethiopia</span>
        </div>

        {/* Navigation Section */}
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            
            {/* Destinations Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100/50 data-[state=open]:bg-slate-100/50 text-[10px] font-black uppercase tracking-widest">
                Destinations
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                  {destinations.map((dest) => (
                    <ListItem
                      key={dest.title}
                      title={dest.title}
                      href={dest.href}
                    >
                      {dest.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Standard Links */}
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="https://southethiopiatours.com/about-us/" 
                className={cn(navigationMenuTriggerStyle(), "bg-transparent text-[10px] font-black uppercase tracking-widest")}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="pl-4 border-l border-slate-200">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white rounded-full h-9 px-6 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200"
            onClick={() => window.location.href = 'https://southethiopiatours.com/contact-us/'}
          >
            Inquire
          </Button>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-red-50 hover:text-red-700 focus:bg-red-50",
            className
          )}
          {...props}
        >
          <div className="text-sm font-black uppercase tracking-tighter leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-slate-500 mt-1 font-medium">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"