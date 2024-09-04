import type { UserProfile, UserRoles } from "@/core/interfaces/entities";
import type { QuerySnapshot } from "firebase/firestore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, SquareArrowRight } from "lucide-react";
import { TextTag } from "@/components/atoms";
import Link from "next/link";

import { updateUserProfile } from "@/core/config/firebase/fire-store";
import { cn } from "@/core/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";

function UserRoleDropDown({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: UserProfile;
}) {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["users", profile.id],
    mutationFn: updateUserProfile,
  });

  const refreshUsersQueryCache = () => {
    // refresh the "users" query caches
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-start gap-4">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="text-sm font-light">
          Change Role
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {(["USER", "ADMIN"] as UserRoles[]).map((role) => (
          <DropdownMenuItem
            key={role}
            disabled={isPending || profile.role === role}
            className={cn(
              profile.role === role ? "font-semibold text-app_text_blue" : ""
            )}
            onClick={() => {
              mutateAsync({ email: profile.email, updates: { role } }).finally(
                () => refreshUsersQueryCache()
              );
            }}
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserTable({
  userProfiles,
  isLoading,
}: {
  userProfiles: QuerySnapshot<UserProfile>;
  isLoading: boolean;
}) {
  return (
    <Table>
      <TableCaption>R - Cloud Users.</TableCaption>

      <TableHeader>
        <TableRow>
          {["Email", "Plan", "Role", "Used Bytes", "Date Joined"].map(
            (header) => (
              <TableHead key={header}>{header}</TableHead>
            )
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {userProfiles?.docs.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell>{profile.data().email}</TableCell>
            <TableCell>{profile.data().plan.label}</TableCell>

            <TableCell>
              <UserRoleDropDown profile={{ ...profile.data(), id: profile.id }}>
                <TextTag
                  className={cn(
                    profile.data().role === "ADMIN" ? "text-app_text_blue" : ""
                  )}
                >
                  {profile.data().role}
                </TextTag>

                <ChevronDown size={15} />
              </UserRoleDropDown>
            </TableCell>

            <TableCell>{profile.data().plan.used_bytes}</TableCell>
            <TableCell>
              {new Date(profile.data().date_created).toDateString()}
            </TableCell>

            <TableCell>
              <Link href={`/dashboard/users/${encodeURIComponent(profile.id)}`}>
                <SquareArrowRight className="cursor-pointer" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { UserTable };
