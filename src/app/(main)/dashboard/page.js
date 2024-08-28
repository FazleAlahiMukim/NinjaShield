"use client"
import { useUser } from '@/context/UserContext';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <h2>
      Welcome, {user.firstName} {user.lastName}!
    </h2>
  );
}
