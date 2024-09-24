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

import { cn } from "@/core/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRights } from "@/providers/hooks";
import { useUpdateUserProfile } from "../../api/users.mutations";

function UserRoleDropDown({
  children,
  profile,
  isSuperAdmin,
}: {
  children: React.ReactNode;
  profile: UserProfile;
  isSuperAdmin: boolean;
}) {
  const { mutateAsync, isPending } = useUpdateUserProfile(profile);

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
            onClick={() =>
              mutateAsync({ email: profile.email, updates: { role } })
            }
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
