import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, MapPin, Users, Zap, BarChart3 } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Event",
      description: "Start planning your next amazing event",
      icon: Plus,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      iconColor: "text-orange-600",
      primary: true,
    },
    {
      title: "View Calendar",
      description: "See all your upcoming events",
      icon: Calendar,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-600",
      primary: false,
    },
    {
      title: "Find Venues",
      description: "Discover perfect locations",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 hover:bg-green-100",
      iconColor: "text-green-600",
      primary: false,
    },
    {
      title: "Invite People",
      description: "Build your community",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-600",
      primary: false,
    },
    {
      title: "Event Analytics",
      description: "Track your event performance",
      icon: BarChart3,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      iconColor: "text-indigo-600",
      primary: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to get started?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take action and create amazing experiences. Everything you need to
          organize successful events is just a click away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className={`group cursor-pointer transition-all duration-200 hover:shadow-lg border-0 ${
                action.primary
                  ? "bg-gradient-to-br from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                  : `${action.bgColor} hover:shadow-md`
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      action.primary
                        ? "bg-white/20 backdrop-blur-sm"
                        : action.bgColor.replace("hover:", "")
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        action.primary ? "text-white" : action.iconColor
                      }`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3
                      className={`font-semibold ${
                        action.primary ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {action.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        action.primary ? "text-orange-100" : "text-gray-600"
                      }`}
                    >
                      {action.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap
                      className={`h-4 w-4 ${
                        action.primary ? "text-white" : action.iconColor
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
