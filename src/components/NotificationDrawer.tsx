import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface NotificationDrawerProps {
  children: React.ReactNode;
}

export const NotificationDrawer = ({ children }: NotificationDrawerProps) => {
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
    }
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-anime-dark-bg border-anime-border max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="text-anime-text text-lg">Notifications</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-center gap-3 p-3 mb-3 bg-anime-card-bg border border-anime-border rounded-lg hover:bg-anime-card-bg/80 transition-colors cursor-pointer"
            >
              <img 
                src={notification.image} 
                alt={notification.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-anime-text font-medium text-sm">{notification.title}</h4>
                <p className="text-anime-text-muted text-xs">{notification.message}</p>
                <span className="text-anime-text-muted text-xs">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};