"use client";

import {Button} from "@/app/components/Buttons";
import {useRouter} from "next/navigation";
import {PropsWithChildren} from "react";

export const BackButton = ({children}: PropsWithChildren) => {
    const router = useRouter();

    return <Button onClick={() => router.back()} variant={'white'}>{children}</Button>
}