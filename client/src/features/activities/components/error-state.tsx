import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: Readonly<ErrorStateProps>) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-3xl border border-red-100 p-8 md:p-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-red-200 to-transparent rounded-full opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-orange-200 to-transparent rounded-full opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        {/* Error Icon */}
        <div className="relative">
          <div className="h-16 w-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full animate-bounce-subtle" />
        </div>

        {/* Error Content */}
        <div className="space-y-3 max-w-md">
          <h3 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We couldn't load your events right now. Don't worry, this happens
            sometimes.
          </p>
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 font-mono">
            {error}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            className="px-6 py-3 rounded-full border-gray-300 hover:border-gray-400 transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-sm text-gray-500">
          Still having trouble?{" "}
          <button className="text-red-600 hover:text-red-700 font-medium underline inline-flex items-center">
            <MessageCircle className="mr-1 h-3 w-3" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
