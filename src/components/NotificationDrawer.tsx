import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface NotificationDrawerProps {
  children: React.ReactNode;
}

export const NotificationDrawer = ({ children }: NotificationDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const notifications = [
    {
      id: 1,
      title: "Solo Leveling Season 2",
      message: "Episode 13 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/65f92e6e315a931ef872da4b312442b8.jpg",
      time: "2 minutes ago"
    },
    {
      id: 2,
      title: "Wind Breaker Season 2", 
      message: "Episode 3 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/87e766fbe5e592efbbc84c9302861612.jpg",
      time: "1 hour ago"
    },
    {
      id: 3,
      title: "My Hero Academia: Vigilantes",
      message: "Episode 2 has been added", 
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1b06ba20c769cf017ebf654ca8e9fbda.jpg",
      time: "3 hours ago"
    },
    {
      id: 4,
      title: "Fire Force Season 3",
      message: "Episode 4 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e5dee087051734a86d59c748b6bf201a.jpg",
      time: "5 hours ago"
    },
    {
      id: 5,
      title: "The Super Cube",
      message: "Episode 8 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/71a1f086c03a5f0157834c17860e1235.jpg",
      time: "8 hours ago"
    },
    {
      id: 6,
      title: "Devil May Cry",
      message: "Episode 9 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/25f6e7ccb3cd200ebb8f779f54aca862.jpg",
      time: "12 hours ago"
    },
    {
      id: 7,
      title: "One Piece",
      message: "Episode 1126 has been added",
      image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg",
      time: "1 day ago"
    }
  ];

  const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => (
    <div className="flex items-center gap-3 p-3 mb-3 bg-anime-card-bg border border-anime-border rounded-lg hover:bg-anime-card-bg/80 transition-colors cursor-pointer">
      <img 
        src={notification.image} 
        alt={notification.title}
        className="w-12 h-16 object-cover rounded flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-anime-text font-medium text-sm truncate">{notification.title}</h4>
        <p className="text-anime-text-muted text-xs truncate">{notification.message}</p>
        <span className="text-anime-text-muted text-xs">{notification.time}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Version - Sheet */}
      <div className="hidden lg:block">
        <Sheet>
          <SheetTrigger asChild>
            {children}
          </SheetTrigger>
          <SheetContent 
            side="right"
            className="w-96 bg-anime-dark-bg border-anime-border p-0 shadow-xl"
          >
            <SheetHeader className="p-4 border-b border-anime-border">
              <SheetTitle className="text-anime-text text-lg font-medium">Notifications</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[400px]">
              <div className="p-3">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Version - Drawer */}
      <div className="lg:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            {children}
          </DrawerTrigger>
          <DrawerContent className="bg-anime-dark-bg border-anime-border max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle className="text-anime-text text-lg">Notifications</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="h-[320px]">
              <div className="px-4 pb-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};