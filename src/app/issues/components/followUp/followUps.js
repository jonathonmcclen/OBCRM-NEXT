import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../../../../config/supabase-client";
import { Link } from "react-router-dom";

import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

function FollowUps({ id }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getIssues() {
      setLoading(true);

      let { data, error } = await supabase
        .from("followups")
        .select(`*`)
        .eq("order", id);

      if (error) {
        console.warn(error);
      } else if (data) {
        setIssues(data);
      }
      setLoading(false);
    }
    getIssues();
  }, []);

  useEffect(() => {
    console.log(issues);
  }, [issues]);

  return (
    <>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              Follow Ups
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Followups for current issue.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link to="/issues/new">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Add Follow Up
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
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Author
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Contact
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {issues.map((prop) => (
                            <tr key={prop.id} className="even:bg-gray-50">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {prop.id}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  to={"/properties/" + prop.properties.id}
                                >
                                  {prop.properties.name}
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {prop.profiles?.full_name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {prop.assignee}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {prop.type}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {prop.description?.substring(0, 30)}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  to={"/issues/" + prop.id + "/edit"}
                                >
                                  <PencilIcon className="h-[18px] inline-block mr-2" />
                                </Link>
                                <Link
                                  className="text-indigo-600 hover:text-indigo-900"
                                  to={"/issues/" + prop.id}
                                >
                                  <EyeIcon className="h-[20px] inline-block mr-2" />
                                </Link>
                                <TrashIcon className="h-[20px] inline-block mr-2" />
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

export default FollowUps;
