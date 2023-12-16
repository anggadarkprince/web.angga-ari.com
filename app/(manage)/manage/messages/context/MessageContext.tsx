"use client"

import {createContext, PropsWithChildren, useContext, useState} from "react";
import {ContactResponse} from "@/app/(manage)/manage/messages/page";

const defaultMessages: ContactResponse =  {
    data: [],
    meta: {
        page: 0,
        limit: 0,
        total_item: 0,
        total_page: 0,
        has_prev: false,
        has_next: false,
    }
};
export const MessageContext = createContext<{
    showFilter: boolean,
    setShowFilter: (value: boolean) => void,
    messages: ContactResponse;
    setMessages: (response: ContactResponse) => void,
}>({
    showFilter: false,
    setShowFilter: () => {},
    messages: defaultMessages,
    setMessages: () => {}
});

export function MessageContextProvider({children}: PropsWithChildren) {
    const [showFilter, setShowFilter] = useState(false);
    const [messages, setMessages] = useState(defaultMessages);

    return (
        <MessageContext.Provider value={{showFilter, setShowFilter, messages, setMessages}}>
            {children}
        </MessageContext.Provider>
    );
}
export const useMessagePage = () => {
    const context = useContext(MessageContext);

    if (context === undefined) {
        throw new Error('useMessagePage was used outside of its Provider');
    }

    return context;
};
