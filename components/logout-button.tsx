
// components/logout-button.tsx
"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useLogout } from "@/lib/auth-client"; // Import the hook

interface LogoutButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children, ...props }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = useLogout();

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={onLogout}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        "Logging out..."
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          {children || "Log out"}
        </>
      )}
    </Button>
  );
}

