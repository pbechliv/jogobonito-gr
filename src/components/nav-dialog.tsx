import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tag } from "@jogo/definitions";
import { Categories } from "./categories";

interface NavDialogProps {
  tags: Tag[];
  className?: string;
}

export default function NavDialog({ tags, className }: NavDialogProps) {
  let [isOpen, setIsOpen] = useState(false);

  const tabs = ["Βασικές", "Όλες"];

  const mainTags = tags.filter((tag) => tag.isMain);
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
        className={`
            h-10 w-10 
            rounded-full
          hover:bg-yellow-200
          active:bg-yellow-300`}
      >
        <Bars3Icon className="h-6 w-6 m-auto" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-screen min-w-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-md:h-full max-md:w-full h-96 w-96 transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center"
                  >
                    <h3 className=" text-2xl">Κατηγορίες</h3>
                    <button
                      onClick={closeModal}
                      className={`
                        h-10 w-10 
                        rounded-full
                      hover:bg-yellow-200
                      active:bg-yellow-300`}
                    >
                      <XMarkIcon className="h-6 w-6 m-auto" />
                    </button>
                  </Dialog.Title>
                  <Tab.Group>
                    <Tab.List className={"mt-2 flex gap-4 justify-evenly"}>
                      {tabs.map((tab) => (
                        <Tab key={tab} as={Fragment}>
                          {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <button
                              className={`
                                rounded-full text-lg px-2 py-1 w-36
                              ${selected ? "bg-yellow-200" : "bg-white"}`}
                            >
                              {tab}
                            </button>
                          )}
                        </Tab>
                        // <Tab key={tab}>{tab}</Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className={"h-full"}>
                      <Tab.Panel className={"h-full"}>
                        <Categories tags={mainTags} />
                      </Tab.Panel>
                      <Tab.Panel className={"h-full"}>
                        <Categories tags={secondaryTags} />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
