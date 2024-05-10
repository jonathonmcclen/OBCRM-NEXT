"use client";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "@/config/supabase-client";
import Link from "next/link";

import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(true);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(24);

  useEffect(() => {
    async function getIssues() {
      setLoading(true);

      let { data, count, error } = await supabase
        .from("work_orders")
        .select(
          `id, reporter, type, description, assignee, status, properties (
          *
        ), profiles!public_work_orders_reporter_fkey (
          full_name,id
        )`,
          { count: "exact" },
        )
        .order("id", { ascending: false })
        .range(0, 24);

      if (error) {
        console.warn(error);
      } else if (data) {
        setCount(count);
        setIssues(data);
      }
      setLoading(false);
    }
    getIssues();
  }, []);

  useEffect(() => {
    console.log(count);
  }, [count]);

  async function getOpenIssues() {
    setLoading(true);

    let { data, error } = await supabase
      .from("work_orders")
      .select(
        `id, reporter, type, description, assignee, status, properties (
        *
      ), profiles!public_work_orders_reporter_fkey (
        full_name,id
      )`,
      )
      .eq("status", "Open")
      .order("id", { ascending: false })
      .range(0, 24);

    if (error) {
      console.warn(error);
    } else if (data) {
      setIssues(data);
    }
    setLoading(false);
  }

  async function getClosedIssues() {
    setLoading(true);

    let { data, error } = await supabase
      .from("work_orders")
      .select(
        `id, reporter, type, description, assignee, status, properties (
        *
      ), profiles!public_work_orders_reporter_fkey (
        full_name,id
      )`,
      )
      .eq("status", "Closed")
      .order("created_at", { ascending: false })
      .range(0, 24);

    if (error) {
      console.warn(error);
    } else if (data) {
      setIssues(data);
    }
    setLoading(false);
  }

  return (
    <>
      {console.log(issues)}
      <title>Issues | Regent Services</title>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              {"( "}
              {issues.length} {")"} Issues
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the issues in your account including their name,
              address, and notes.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href="/issues/new">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Add Issue
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          {loading ? (
            <div>LOADING</div>
          ) : (
            <>
              <div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <button
                        onClick={getOpenIssues}
                        type="button"
                        className="block inline-block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Open
                      </button>
                      <button
                        onClick={getClosedIssues}
                        type="button"
                        className="ml-2 block inline-block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Closed
                      </button>
                    </div>
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Actions
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Property
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Reporter
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Status
                            </th>{" "}
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Type
                            </th>{" "}
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Description
                            </th>{" "}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {issues?.map((prop) => (
                            <tr key={prop.id} className="even:bg-gray-50">
                              <Link href={"/issues/" + prop.id}>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-3">
                                  <Link
                                    className="text-indigo-600 hover:text-indigo-900"
                                    href={"/issues/" + prop.id + "/edit"}
                                  >
                                    <PencilIcon className="mr-2 inline-block h-[18px]" />
                                  </Link>
                                  <Link
                                    className="text-indigo-600 hover:text-indigo-900"
                                    href={"/issues/" + prop.id}
                                  >
                                    <EyeIcon className="mr-2 inline-block h-[20px]" />
                                  </Link>
                                  <TrashIcon className="mr-2 inline-block h-[20px]" />
                                  <span className="sr-only">, {prop.name}</span>
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                  {prop.id}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <Link
                                    className="text-indigo-600 hover:text-indigo-900"
                                    href={"/properties/" + prop.properties.id}
                                  >
                                    {prop.properties.name}
                                  </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {prop.profiles?.full_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {prop.status}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {prop.type}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {prop.description?.substring(0, 30)}
                                </td>
                              </Link>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">1</span> to
                              <span className="font-medium">
                                {" "}
                                {issues.length}
                              </span>{" "}
                              of
                              <span className="font-medium"> {count} </span>
                              results
                            </p>
                          </div>
                          <div>
                            <nav
                              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                              aria-label="Pagination"
                            >
                              <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </a>
                              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                              <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                1
                              </a>
                              <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              >
                                2
                              </a>
                              <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                              >
                                3
                              </a>
                              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                ...
                              </span>
                              <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                              >
                                8
                              </a>
                              <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              >
                                9
                              </a>
                              <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              >
                                10
                              </a>
                              <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </a>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Issues;
