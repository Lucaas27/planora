import { Plus, Calendar, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNew?: () => void;
}

export function EmptyState({ onCreateNew }: Readonly<EmptyStateProps>) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-3xl border border-orange-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-orange-200 to-transparent rounded-full opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-red-200 to-transparent rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-200 to-transparent rounded-full opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-8 text-center space-y-6">
        {/* Icon */}
        <div className="relative">
          <div className="h-20 w-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 max-w-md">
          <h3 className="text-2xl font-bold text-gray-900">
            No events created yet
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Start your journey by creating your first amazing event. Connect
            with people, share experiences, and build memorable moments.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Easy Planning
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Engage Audience
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Any Location
            </span>
          </div>
        </div>

        {/* CTA Button */}
        {onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Event
          </Button>
        )}

        {/* Additional Help */}
        <div className="text-sm text-gray-500">
          Need inspiration? Check out our{" "}
          <button className="text-orange-600 hover:text-orange-700 font-medium underline">
            event templates
          </button>
        </div>
      </div>
    </div>
  );
}
