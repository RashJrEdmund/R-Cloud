import type { UserProfile, UserRoles } from "@/core/interfaces/entities";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";

function UserRoleDropDown({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: UserProfile;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["users", profile.id],
    mutationFn: updateUserProfile,
    onMutate: async (update) => {
      const { email, updates: { role } } = update;
      // optimistic updates
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevUsers = queryClient.getQueryData(["users"]) as UserProfile[];

      queryClient.setQueryData(["users"], () => prevUsers.map((user) => {
        if (user.email !== email) return user;

        // optimistically update user
        return { ...user, role };
      }));

      return { prevUsers };
    },
    onError: (err, updateUser, context) => {
      // rolling-back logic if function fails;
      queryClient.setQueryData(["users"], context?.prevUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

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
              "outline-none",
              profile.role === role ? "font-semibold text-app_text_blue" : ""
            )}
            onClick={() => mutate({ email: profile.email, updates: { role } })}
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
  userProfiles: UserProfile[];
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
        {userProfiles?.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell>{profile.email}</TableCell>
            <TableCell>{profile.plan.label}</TableCell>

            <TableCell>
              <UserRoleDropDown profile={{ ...profile, id: profile.id }}>
                <TextTag
                  className={cn(
                    profile.role === "ADMIN" ? "text-app_text_blue" : ""
                  )}
                >
                  {profile.role}
                </TextTag>

                <ChevronDown size={15} />
              </UserRoleDropDown>
            </TableCell>

            <TableCell>{profile.plan.used_bytes}</TableCell>

            <TableCell>
              {new Date(profile.date_created).toDateString()}
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
