import { AuthProvider } from "./Hooks/AuthContext";
import Profile from "./components/Profile";
import ProtectedRoutes from "./components/ProtectedRoute";

export default function Home() {
  
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <Profile/>
      </ProtectedRoutes>
    </AuthProvider>
  )
}