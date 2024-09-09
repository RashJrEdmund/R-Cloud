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
import { useRights } from "@/providers/hooks";

function UserRoleDropDown({
  children,
  profile,
  isSuperAdmin,
}: {
  children: React.ReactNode;
  profile: UserProfile;
  isSuperAdmin: boolean;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["users", profile.id],
    mutationFn: updateUserProfile,
    onMutate: async (update) => {
      const {
        email,
        updates: { role },
      } = update;
      // optimistic updates
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevUsers = queryClient.getQueryData(["users"]) as UserProfile[];

      queryClient.setQueryData(["users"], () =>
        prevUsers.map((user) => {
          if (user.email !== email) return user;

          // optimistically update user
          return { ...user, role };
        })
      );

      return { prevUsers };
    },
    onError: (err, updateUser, context) => {
      // rolling-back logic if function fails;
      queryClient.setQueryData(["users"], context?.prevUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={profile.role === "SUPER_ADMIN" || !isSuperAdmin}
        className="flex items-center justify-start gap-4"
      >
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
            {role.replace("_", " ")}
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
  const isSuperAdmin = useRights(["SUPER_ADMIN"]);

  return (
    <>
      <Table className="mx-0 mt-4 w-full">
        <TableHeader className="border">
          <TableRow>
            {["Email", "Plan", "Role", "Used Bytes", "Date Joined"].map(
              (header) => (
                <TableHead
                  key={header}
                  className="whitespace-nowrap border font-bold"
                >
                  {header}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="border">
          {userProfiles?.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell className="whitespace-nowrap border">
                {profile.email}
              </TableCell>

              <TableCell className="border">{profile.plan.label}</TableCell>

              <TableCell className="border">
                <UserRoleDropDown
                  profile={{ ...profile, id: profile.id }}
                  isSuperAdmin={isSuperAdmin}
                >
                  <TextTag
                    className={cn(
                      ["ADMIN", "SUPER_ADMIN"].includes(profile.role)
                        ? "text-app_text_blue"
                        : ""
                    )}
                  >
                    {profile.role.replace("_", " ")}
                  </TextTag>

                  {isSuperAdmin && profile.role !== "SUPER_ADMIN" ? (
                    <ChevronDown size={15} />
                  ) : null}
                </UserRoleDropDown>
              </TableCell>

              <TableCell className="whitespace-nowrap border">
                {profile.plan.used_bytes}
              </TableCell>

              <TableCell className="whitespace-nowrap border">
                {new Date(profile.date_created).toDateString()}
              </TableCell>

              <TableCell className="border">
                <Link
                  href={`/dashboard/users/${encodeURIComponent(profile.id)}`}
                >
                  <SquareArrowRight className="cursor-pointer opacity-50" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TableCaption>R - Cloud Users.</TableCaption>
    </>
  );
}

export { UserTable };
