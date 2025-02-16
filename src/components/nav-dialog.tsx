"use client";

import { Dialog, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Tag } from "@jogo/definitions";
import { Fragment, useState } from "react";
import { Categories } from "./categories";

interface NavDialogProps {
  tags: Tag[];
  className?: string;
}

export const NavDialog = ({ tags, className }: NavDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);

  const tabs = ["Βασικές", "Άλλες"];
  const mainTagNamesSorted = [
    "Αφιερώματα",
    "Ποδόσφαιρο",
    "Μπάσκετ",
    "Άλλα Σπορ",
  ];
  const mainTags = tags
    .filter((tag) => tag.isMain)
    .sort(
      (a, b) =>
        mainTagNamesSorted.indexOf(a.name) - mainTagNamesSorted.indexOf(b.name)
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
      <button
        onClick={openModal}
        className={`flex justify-end max-md:w-8 lg:w-32 gap-1 font-medium hover:underline`}
      >
        <span className="text-lg max-md:hidden">Κατηγορίες</span>
        <ChevronDownIcon className="h-8 w-8 max-md:hidden" />
        <Bars3Icon className="h-8 w-8 md:hidden" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white h-full w-72 p-6 flex flex-col">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-2xl">Κατηγορίες</Dialog.Title>
                  <button
                    onClick={closeModal}
                    className={`h-10 w-10 rounded-full`}
                  >
                    <XMarkIcon className="h-6 w-6 m-auto" />
                  </button>
                </div>
                <Tab.Group>
                  <Tab.List className={"mt-2 flex gap-4 justify-evenly"}>
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
                  </Tab.List>
                  <Tab.Panels className="mt-2 overflow-y-scroll">
                    <Tab.Panel>
                      <Categories tags={mainTags} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Categories tags={secondaryTags} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
