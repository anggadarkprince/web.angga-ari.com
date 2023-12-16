"use client"

import {Button} from "@/app/components/Buttons";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";

export const ButtonFilter = () => {
    const {setShowFilter} = useMessagePage();

    return (
        <Button variant="success" onClick={() => setShowFilter(true)}>
            <i className="uil-filter"></i>
        </Button>
    )
}