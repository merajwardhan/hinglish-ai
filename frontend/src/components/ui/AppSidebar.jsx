// AppSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./Sidebar.jsx"
import { Home, Settings, MessageCirclePlus } from "lucide-react"
import { Button } from "../ui/Button.jsx"
import { cn } from "../../utils/cn.js"

export function AppSidebar() {
  return (
    <Sidebar className='text-black dark:text-white pt-10'>
      <SidebarHeader>
        {/* You could put your logo here */}
        <Button
          variant="ghost"
          size="default"
          className={cn("rounded-full bg-input/30")}
        >
          <MessageCirclePlus className='text-black dark:text-white' />
          <span>New Message</span>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        {/* This is where you add your navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Home">
                <Home className="size-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* You could put a user profile button here */}
        <span className="flex justify-center font-semibold text-lg">Settings</span>
      </SidebarFooter>
    </Sidebar>
  )
}
