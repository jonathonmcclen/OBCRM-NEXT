"use client";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import {
  PaperClipIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import FollowUps from "../components/followUp";

import { Dialog, Transition } from "@headlessui/react";

const tabs = [
  { name: "General", href: "#", icon: UserIcon, current: true },
  { name: "Followups", href: "#", icon: BuildingOfficeIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DisplayIssue({ id }) {
  // const params = useParams();
  // const { id } = params;
  const [loading, setLoading] = useState();
  const [issue, setIssue] = useState();
  const [created, setCreated] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getIssue() {
      setLoading(true);

      let { data, error } = await supabase
        .from("work_orders")
        .select(`*, properties (*)`)
        .eq("id", id);

      if (error) {
        console.warn(error);
      } else if (data) {
        setIssue(data[0]);
      }
      setLoading(false);
    }

    getIssue();
  }, []);

  useEffect(() => {
    console.log(issue);
    if (issue) {
      console.log(Date(parseInt(issue.created_at) * 1000));
      setCreated(Date(parseInt(issue.created_at) * 1000));
    }
  }, [issue]);

  // document.title = `${issue?.status} Issue ${issue?.id} | ${issue?.properties.name} | ${issue?.description.substring(0, 30)}`;

  return (
    <>
      {issue && (
        <title>{`${issue?.status} Issue ${issue?.id} | ${issue?.properties?.name} | ${issue?.description?.substring(0, 30)}`}</title>
      )}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/issues">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Back
          </button>{" "}
        </Link>
        <Link href={"/issues/" + issue?.id + "/edit"}>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </Link>
      </div>
      <div>
        <div className="hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className=" sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.current
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {issue && (
        <div className="mt-[50px]">
          <div className="px-4 sm:px-0">
            <h3 className="text-4xl font-semibold leading-7 text-gray-900">
              {/* {issue.description}s */}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {created}
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Images
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="h-[250px] w-full text-center">
                    {issue.images && (
                      <img
                        className="mx-auto h-full"
                        src={
                          "https://bcnnvbpbwelebmdyvesf.supabase.co/storage/v1/object/public/issues/" +
                          issue.images[0]
                        }
                      />
                    )}
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Status
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {issue.status}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {issue.type}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {issue.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Property
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {issue.properties.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Reporter
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <p>{issue.reporter}</p>
                </dd>
              </div>
              {/* <FollowUps id={id} /> */}
            </dl>
          </div>
        </div>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative h-[400px] w-[400px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Consequatur amet labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default DisplayIssue;
