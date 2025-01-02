import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import UsersList from '@/components/admin/UsersList';
import { UserStatus } from '@prisma/client';

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      profile: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Suspense fallback={<div>Loading...</div>}>
          <UsersList users={users} />
        </Suspense>
      </div>
    </div>
  );
} 