"use client"

import {Modal, ModalBody, ModalFooter, ModalHeader} from "@/app/components/Modal";
import {Button} from "@/app/components/Buttons";
import {Input} from "@/app/components/Inputs";
import React, {useState} from "react";
import {DatePicker} from "@/app/components/DatePicker";
import {parseISO} from "date-fns";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Form, FormSubmitHandler} from "@/app/components/Form/Form";
import {useMessagePage} from "@/app/(manage)/manage/messages/context/MessageContext";
import {dateFormat, filterToParam} from "@/app/utility/helpers";

export const ModalFilter = () => {
  const {showFilter, setShowFilter} = useMessagePage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const [dateFrom, setDateFrom] = useState(searchParams.get('date_from') || '');
  const defaultValues = {
    search: searchParams.get('search') || '',
    date_from: dateFrom,
    date_to: searchParams.get('date_to') || ''
  };

  const onApplyFilter: FormSubmitHandler<typeof defaultValues> = (filters) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    filterToParam(params, filters, 'search');
    filterToParam(params, filters, 'date_from');
    filterToParam(params, filters, 'date_to');
    replace(`${pathname}?${params.toString()}`);
    setShowFilter(false);
  }

  const onResetFilter = () => {
    setShowFilter(false);
    replace(pathname);
  }

  return (
    <Modal show={showFilter}>
      <Form onSubmit={onApplyFilter} defaultValues={defaultValues}>
        <ModalHeader title="Filter Message" icon={"uil-filter"} onClose={() => setShowFilter(false)}/>
        <ModalBody>
          <Input
              label={"Search"}
              placeholder={"Find messages"}
              name={"search"}
          />
          <div className={"display-grid col-2 column-gap-2"}>
            <DatePicker
                label={"From"}
                placeholder={"Date from"}
                name={"date_from"}
                id={"date-from"}
                isClearable={true}
                onDateChange={date => {
                  setDateFrom(dateFormat(date, 'yyyy-MM-dd') || '');
                }}
            />
            <DatePicker
                label={"To"}
                placeholder={"Date to"}
                name={"date_to"}
                id={"date-to"}
                minDate={parseISO(dateFrom)}
                isClearable={true}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant={"white"} onClick={onResetFilter}>Reset Filter</Button>
          <Button type={"submit"} variant={"success"}>
            Apply Filter
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}
