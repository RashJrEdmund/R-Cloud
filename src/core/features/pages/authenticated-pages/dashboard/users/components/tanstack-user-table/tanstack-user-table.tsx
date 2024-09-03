/**
 * install tanstack table with pnpm i @tanstack/react-table; or just got to the docks
 */

// import type { UserProfile } from "@/core/interfaces/entities";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel
// } from "@tanstack/react-table";

// const data = [
//   {
//     "plan": {
//       "date_subscribed": "2024-08-28T23:00:00.000Z",
//       "is_free": true,
//       "plan_id": "0",
//       "icon_url": "/storage-plans/sigma.svg",
//       "label": "SIGMA",
//       "capacity": "1.5 Gb",
//       "rate": "0 XAF / Month",
//       "bytes": 1610612736,
//       "used_bytes": 0
//     },
//     "phone_number": "",
//     "date_created": "2024-08-28T23:00:00.000Z",
//     "role": "USER",
//     "email": "arreyettaekep@gmail.com",
//     "id": "arreyettaekep@gmail.com",
//     "date_of_birth": "",
//   },
//   {
//     "plan": {
//       "is_free": true,
//       "rate": "0 XAF / Month",
//       "plan_id": "0",
//       "icon_url": "/storage-plans/sigma.svg",
//       "date_subscribed": "2024-04-20T23:00:00.000Z",
//       "capacity": "1.5 Gb",
//       "bytes": 1610612736,
//       "label": "SIGMA",
//       "used_bytes": 2450847
//     },
//     "date_created": "2024-04-20T23:00:00.000Z",
//     "phone_number": "",
//     "email": "batahumphrey66@gmail.com",
//     "id": "batahumphrey66@gmail.com",
//     "date_of_birth": "",
//     role: "USER"
//   },
//   {
//     "date_of_birth": "",
//     "plan": {
//       "bytes": 1610612736,
//       "icon_url": "/storage-plans/sigma.svg",
//       "is_free": true,
//       "used_bytes": 451966,
//       "date_subscribed": "2024-03-28T23:00:00.000Z",
//       "capacity": "1.5 Gb",
//       "label": "SIGMA",
//       "plan_id": "0",
//       "rate": "0 XAF / Month"
//     },
//     "date_created": "2024-03-28T23:00:00.000Z",
//     "phone_number": "",
//     "id": "boanongjoshua@gmail.com",
//     "email": "boanongjoshua@gmail.com",
//     role: "USER"
//   },
//   {
//     "email": "davykennang552@gmail.com",
//     "date_of_birth": "",
//     "phone_number": "",
//     "plan": {
//       "plan_id": "0",
//       "label": "SIGMA",
//       "rate": "0 XAF / Month",
//       "bytes": 1610612736,
//       "icon_url": "/storage-plans/sigma.svg",
//       "capacity": "1.5 Gb",
//       "is_free": true,
//       "used_bytes": 0,
//       "date_subscribed": "2024-08-25T23:00:00.000Z"
//     },
//     "date_created": "2024-08-25T23:00:00.000Z",
//     "id": "davykennang552@gmail.com",
//     "role": "USER",
//   },
//   {
//     "date_of_birth": "1623110400",
//     "plan": {
//       "plan_id": "0",
//       "capacity": "1.5 Gb",
//       "used_bytes": 4285915,
//       "label": "SIGMA",
//       "date_subscribed": "2024-06-19T23:00:00.000Z",
//       "is_free": true,
//       "rate": "0 XAF / Month",
//       "bytes": 1610612736,
//       "icon_url": "/storage-plans/sigma.svg"
//     },
//     "date_created": "2024-06-19T23:00:00.000Z",
//     "id": "elmozaro3@gmail.com",
//     "role": "USER",
//     "phone_number": "",
//     "email": "elmozaro3@gmail.com",
//   },
//   {
//     "email": "giress865@gmail.com",
//     "phone_number": "",
//     "plan": {
//       "label": "SIGMA",
//       "date_subscribed": "2024-08-20T23:00:00.000Z",
//       "rate": "0 XAF / Month",
//       "capacity": "1.5 Gb",
//       "is_free": true,
//       "bytes": 1610612736,
//       "used_bytes": 0,
//       "plan_id": "0",
//       "icon_url": "/storage-plans/sigma.svg"
//     },
//     "id": "giress865@gmail.com",
//     "date_created": "2024-08-20T23:00:00.000Z",
//     "date_of_birth": "1118016000",
//     "role": "USER",
//   },
//   {
//     "role": "ADMIN",
//     "date_created": "2024-03-26T23:00:00.000Z",
//     "date_of_birth": "",
//     "id": "orashusedmund@gmail.com",
//     "phone_number": "",
//     "plan": {
//       "bytes": 1610612736,
//       "date_subscribed": "2024-03-26T23:00:00.000Z",
//       "used_bytes": 220551432,
//       "rate": "0 XAF / Month",
//       "is_free": true,
//       "icon_url": "/storage-plans/sigma.svg",
//       "plan_id": "0",
//       "capacity": "1.5 Gb",
//       "label": "SIGMA"
//     },
//     "email": "orashusedmund@gmail.com",
//   },
// ];

// function UserTable() {
//   const tableInstance = useReactTable<UserProfile>({
//     columns: [
//       {
//         accessorKey: "email",
//         header: "Email",
//         // accessorFn: (row) =>
//       }
//     ],
//     data: data as UserProfile[],
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <div />
//   );
// };

// export {
//   UserTable,
// };
