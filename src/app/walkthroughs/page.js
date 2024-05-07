"use client";
import { supabaseClient as supabase } from "@/config/supabase-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

function Properties() {
  const [walkthroughs, setWalkthroughs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWalkthroughs() {
      setLoading(true);

      let { data, error } = await supabase
        .from("walkthroughs")
        .select(`* , properties (*), profiles(full_name)`);

      if (error) {
        console.warn(error);
      } else if (data) {
        setWalkthroughs(data);
      }
      setLoading(false);
    }
    getWalkthroughs();
  }, []);

  return (
    <>
      <title>Walkthroughs | Regent Services</title>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              Walkthroughs
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A List of reported walkthroughs of managed properties
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <a target="blank_" href="/walkthroughs/new">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Walkthrough{" "}
                <ArrowRightIcon className="ml-2 inline-block h-[20px]" />
              </button>
            </a>
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
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
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
                              Manager
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Notes
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {walkthroughs.map((prop) => (
                            <tr key={prop.id} className="even:bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {prop.id}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  href={"/properties/" + prop.properties?.id}
                                >
                                  {prop.properties?.name}
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {prop.profiles?.full_name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  href={"/properties/" + prop.id}
                                >
                                  {prop.notes?.substring(0, 80)}...
                                </Link>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  href={"/properties/" + prop.id + "/edit"}
                                >
                                  <PencilIcon className="mr-2 inline-block h-[18px]" />
                                </Link>
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  href={"/properties/" + prop.id}
                                >
                                  <EyeIcon className="mr-2 inline-block h-[20px]" />
                                </Link>
                                <TrashIcon className="mr-2 inline-block h-[20px]" />
                                <span className="sr-only">, {prop.name}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default Properties;
