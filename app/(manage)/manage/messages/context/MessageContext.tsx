"use client"

import {createContext, PropsWithChildren, useContext, useState} from "react";
import {ContactResponse, ContactType} from "@/app/services/messages";

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
    showDelete: boolean,
    setShowDelete: (value: boolean) => void,
    showReply: boolean,
    setShowReply: (value: boolean) => void,
    messages: ContactResponse;
    setMessages: (response: ContactResponse) => void,
    selectedMessage: ContactType | null,
    setSelectedMessage: (contact: ContactType) => void,
}>({
    showFilter: false,
    setShowFilter: () => {},
    showDelete: false,
    setShowDelete: () => {},
    showReply: false,
    setShowReply: () => {},
    messages: defaultMessages,
    setMessages: () => {},
    selectedMessage: null,
    setSelectedMessage: () => {}
});

export function MessageContextProvider({children}: PropsWithChildren) {
    const [showFilter, setShowFilter] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [messages, setMessages] = useState(defaultMessages);
    const [selectedMessage, setSelectedMessage] = useState<ContactType | null>(null);

    const providerValue = {
        showFilter,
        setShowFilter,
        showDelete,
        setShowDelete,
        showReply,
        setShowReply,
        messages,
        setMessages,
        selectedMessage,
        setSelectedMessage,
    };

    return (
        <MessageContext.Provider value={providerValue}>
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
