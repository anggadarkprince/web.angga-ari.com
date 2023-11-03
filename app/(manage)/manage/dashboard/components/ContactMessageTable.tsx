"use client"

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@/app/components/Table";

const rows = [
  {
    id: "1",
    name: "Keenan Evander",
    email: "keenan.evander@gmail.com",
    project: "Mobile Design",
    message: "We need to develop e-commerce and support for mobile data...",
    status: "PENDING",
  },
  {
    id: "2",
    name: "Diana Eka",
    email: "diana.wulanda@gmail.com",
    project: "Web Development",
    message: "Super app for laundry app...",
    status: "REPLIED",
  },
  {
    id: "3",
    name: "Marry Fina",
    email: "merry@gmail.com",
    project: "Advertising",
    message: "Give me some advise",
    status: "REJECTED",
  },
  {
    id: "4",
    name: "Agirna Wurana",
    email: "agirna@gmail.com",
    project: "UI Design",
    message: "We need wesome UI",
    status: "HOLD",
  },
];

const columns = [
  {
    key: "no",
    label: "#",
  },
  {
    key: "name",
    label: "Full Name",
  },
  {
    key: "email",
    label: "Email Address",
  },
  {
    key: "project",
    label: "Project",
  },
  {
    key: "message",
    label: "Message",
  },
  {
    key: "status",
    label: "Status",
  },
];

export const ContactMessageTable = () => {
  return (
    <Table className="mb-2" columns={columns} items={rows}>
      <TableHeader render={(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}/>
      <TableBody render={(item, index) => (
        <TableRow key={`${item.id}-${index}`} render={(columnKey) => (
          <TableCell key={`${item.id}-${columnKey}`}>
            {columnKey === 'no' ? (index + 1) : item[columnKey]}
          </TableCell>
        )} />
      )}/>
    </Table>
  )
}
