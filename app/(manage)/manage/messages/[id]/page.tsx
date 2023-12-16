import {Metadata} from "next";
import {ContactType, fetchMessage} from "@/app/services/messages";
import {PageTitle} from "@/app/(manage)/manage/components/Layouts/PageTitle";
import {BackButton} from "@/app/(manage)/manage/components/Buttons/BackButton";
import {dateFormat} from "@/app/utility/helpers";
import {MessageStatus} from "@/app/(manage)/manage/messages/components/Contents/MessageStatus";

interface ViewMessageProps {
    params: {id: number}
}

export async function generateMetadata({params}: ViewMessageProps): Promise<Metadata> {
    const message: ContactType = await fetchMessage(params.id);
    return {
        title: `Message view: ${message.name}`,
    }
}

export default async function ViewMessage({params}: ViewMessageProps) {
    const message: ContactType = await fetchMessage(params.id);
    return (
        <div>
            <PageTitle title="View Messages" subtitle={`Message from ${message.name}`} className="mb-1"/>
            <div className={"mb-2"}>
                <div className={'display-grid gap-1 column-gap-2 col-lg-2 mb-1'}>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Name</p>
                        <p>{message.name}</p>
                    </div>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Email</p>
                        <p>{message.email}</p>
                    </div>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Project</p>
                        <p>{message.project}</p>
                    </div>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Status</p>
                        <p><MessageStatus status={message.status} /></p>
                    </div>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Created At</p>
                        <p>{dateFormat(message.created_at, 'dd MMMM yyyy HH:mm')}</p>
                    </div>
                    <div className={'display-grid col-2-4'}>
                        <p className={'text-fw-strong'}>Updated At</p>
                        <p>{dateFormat(message.updated_at, 'dd MMMM yyyy HH:mm') || '-'}</p>
                    </div>
                </div>
                <div>
                    <p className="text-fw-strong mb-1">Message</p>
                    <p>{message.message}</p>
                </div>
            </div>

            <div>
                <BackButton>Back</BackButton>
            </div>
        </div>
    )
}