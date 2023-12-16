import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {Button} from "@/app/components/Buttons";
import {API_URL} from "@/app/utility/constants";
import {Pagination} from "@/app/components/Pagination";
import {Metadata} from "next";
import {Suspense} from "react";
import {MessageTable} from "@/app/(manage)/manage/messages/components/Contents/MessageTable";
import {MessageContextProvider} from "@/app/(manage)/manage/messages/context/MessageContext";
import {ButtonFilter} from "@/app/(manage)/manage/messages/components/Buttons/ButtonFilter";
import {ModalFilter} from "@/app/(manage)/manage/messages/components/Modals/ModalFilter";
import hash from "object-hash";
import {fetchAllMessages} from "@/app/services/messages";
import {ModalDelete} from "@/app/(manage)/manage/messages/components/Modals/ModalDelete";
import {ModalReply} from "@/app/(manage)/manage/messages/components/Modals/ModalReply";

export const metadata: Metadata = {
    title: 'Contact messages',
};
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
    const filters = {
        page: searchParams.page || '1',
        limit: searchParams.limit || '10',
        ...searchParams,
    }
    const {data, meta} = await fetchAllMessages(filters);

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
            <ModalFilter/>
            <ModalDelete/>
            <ModalReply/>
        </MessageContextProvider>
    )
}