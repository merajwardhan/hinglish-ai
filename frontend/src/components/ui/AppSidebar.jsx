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
import { Home, Settings } from "lucide-react"

export function AppSidebar() {
  return (
    <Sidebar className='text-black dark:text-white'>
      <SidebarHeader>
        {/* You could put your logo here */}
        <span className="font-semibold text-lg">My App</span>
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
        <span className="font-semibold text-lg">Settings</span>
      </SidebarFooter>
    </Sidebar>
  )
}
