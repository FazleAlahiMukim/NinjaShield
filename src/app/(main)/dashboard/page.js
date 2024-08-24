"use client";
import { useUser } from '../../../context/UserContext';

export default function Dashboard() {
  const { user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <h2>
      Welcome, {user.firstName} {user.lastName}!
    </h2>
  );
}
