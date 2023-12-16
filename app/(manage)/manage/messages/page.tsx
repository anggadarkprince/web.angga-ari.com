import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {Button} from "@/app/components/Buttons";
import {API_URL} from "@/app/utility/constants";
import {cookies} from "next/headers";
import {ContactType, PaginationMetaType} from "@/app/types";
import {Pagination} from "@/app/components/Pagination";
import {Metadata} from "next";
import {Suspense} from "react";
import {MessageTable} from "@/app/(manage)/manage/messages/components/MessageTable";
import {MessageContextProvider} from "@/app/(manage)/manage/messages/context/MessageContext";
import {ButtonFilter} from "@/app/(manage)/manage/messages/components/ButtonFilter";
import {ModalFilter} from "@/app/(manage)/manage/messages/components/ModalFilter";
import hash from "object-hash";

export const metadata: Metadata = {
    title: 'Contact messages',
};
export interface ContactResponse {
    data: ContactType[];
    meta: PaginationMetaType;
}
interface PageProps {
    params: Record<string, string | undefined>;
    searchParams: {
        search?: string;
        page?: string;
        limit?: string;
        status?: 'PENDING' | 'REPLIED' | 'REJECTED' | 'HOLD';
        date_from?: string;
        date_to?: string;
    };
}
export default async function Messages({searchParams}: PageProps) {
    const token = cookies().get("access_token");
    const filters = {
        page: searchParams.page || '1',
        limit: searchParams.limit || '10',
        ...searchParams,
    }
    const response = await fetch(`${API_URL}contacts?${new URLSearchParams(filters)}`, {
        headers: {
            Accept: "application/json",
            Cookie: `access_token=${token?.value}`
        },
        credentials: "include",
    });
    const {data, meta}: ContactResponse = await response.json();

    return (
        <MessageContextProvider>
            <div className="display-flex flex-justify-between">
                <PageTitle title="Messages" subtitle="Contact message" className="mb-1"/>
                <div>
                    <Button href={`${API_URL}/contacts/export`} variant="white" className="mr-0-25">
                        Download CSV <i className="uil-cloud-download ml-0-25"></i>
                    </Button>
                    <ButtonFilter />
                </div>
            </div>
            <Suspense key={hash(filters)} fallback="Fetching messages...">
                <MessageTable data={data} meta={meta} />
            </Suspense>
            <Pagination totalPage={meta.total_page}/>
            <ModalFilter />
        </MessageContextProvider>
    )
}