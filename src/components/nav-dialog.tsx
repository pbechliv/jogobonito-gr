"use client";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tag } from "@jogo/definitions";
import { MAIN_TAG_NAMES_SORTED } from "@jogo/lib/main-tag-names-sorted";
import { Fragment, useState } from "react";
import { Categories } from "./categories";

interface NavDialogProps {
  tags: Tag[];
  className?: string;
}

export const NavDialog = ({ tags, className }: NavDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);

  const tabs = ["Βασικές", "Άλλες"];
  const mainTags = tags
    .filter((tag) => tag.isMain)
    .sort(
      (a, b) =>
        MAIN_TAG_NAMES_SORTED.indexOf(a.name) -
        MAIN_TAG_NAMES_SORTED.indexOf(b.name),
    );
  const secondaryTags = tags.filter((tag) => !tag.isMain);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className={className}>
      <Button
        onClick={openModal}
        className="
          rounded bg-yellow-100 py-2 px-4 text-sm text-black data-[hover]:bg-yellow-200 data-[active]:bg-yellow-200 cursor-pointer"
      >
        <span className="text-lg max-md:hidden">Κατηγορίες</span>
        <Bars3Icon className="h-8 w-8 md:hidden" />
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 flex justify-end items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-white h-full w-72 p-6 flex flex-col overflow-y-scroll">
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-2xl">Κατηγορίες</DialogTitle>
                  <button
                    onClick={closeModal}
                    className={`h-10 w-10 rounded-full cursor-pointer`}
                  >
                    <XMarkIcon className="h-6 w-6 m-auto" />
                  </button>
                </div>
                <TabGroup>
                  <TabList className={"mt-2 flex gap-4 justify-evenly"}>
                    {tabs.map((tab) => (
                      <Tab key={tab} as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`
                                rounded-full text-lg px-2 py-1 w-36
                              ${selected ? "bg-yellow-200" : "bg-white"}`}
                          >
                            {tab}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanels className="mt-2 overflow-y-scroll">
                    <TabPanel>
                      <Categories tags={mainTags} />
                    </TabPanel>
                    <TabPanel>
                      <Categories tags={secondaryTags} />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
