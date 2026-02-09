import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isSignedIn, isLoaded } = useAuth();

    // Show loading while checking auth status
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-peach-500 animate-spin mx-auto mb-4" />
                    <p className="text-primary-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to sign-in if not authenticated
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    // Render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;
