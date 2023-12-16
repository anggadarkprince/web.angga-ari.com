import {Label} from "@/app/components/Label";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "@/app/components/Dropdowns";
import {Table} from "@/app/components/Table";
import {ContactResponse} from "@/app/(manage)/manage/messages/page";

export const MessageTable = ({data, meta}: ContactResponse) => {
    return (
        <Table className="mb-2">
            <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Project</th>
                <th>Message</th>
                <th>Status</th>
                <th className="text-right">Action</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((contact, index) => {
                    return (
                        <tr key={`contact-${contact.id}`}>
                            <td>{((meta.page - 1) * meta.limit) + (index + 1)}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.project}</td>
                            <td>{contact.message}</td>
                            <td><Label variant={"white"}>{contact.status}</Label></td>
                            <td className="text-right">
                                <Dropdown>
                                    <DropdownToggle variant={"primary"} size={"small"}>
                                        Action
                                    </DropdownToggle>
                                    <DropdownMenu positionRight={true}>
                                        <DropdownItem icon="uil-search" title="View"/>
                                        <DropdownItem icon="uil-envelope-upload" title="Edit"/>
                                        <DropdownItem icon="uil-trash" title="Delete"/>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                    )
                })
            }
            {
                (!data || data.length === 0) && (
                    <tr>
                        <td colSpan={7}>No data available</td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
}