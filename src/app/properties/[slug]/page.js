"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  ClipboardDocumentListIcon,
  UserIcon,
  UsersIcon,
  MapPinIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";
import PropertyIssues from "../components/propertyIssues";

const tabs = [
  { name: "General", href: "#", icon: UserIcon, current: true },
  {
    name: "Open Issues",
    href: "#",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  {
    name: "Walkthroughs",
    href: "#",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  { name: "Inventory", href: "#", icon: ArchiveBoxIcon, current: false },
  { name: "Contacts", href: "#", icon: UsersIcon, current: false },
  { name: "Location", href: "#", icon: MapPinIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Property({ params }) {
  const [loading, setLoading] = useState();
  const [property, setProperty] = useState();

  const [currentTab, setCurrentTab] = useState("General");

  useEffect(() => {
    if (params.tab == "OpenIssues") {
      setCurrentTab("Open Issues");
    } else if (params.tab == "Contacts") {
      setCurrentTab("Contacts");
    } else if (params.tab == "Location") {
      setCurrentTab("Location");
    } else {
      setCurrentTab("General");
    }

    async function getProperty() {
      setLoading(true);

      let { data, error } = await supabase
        .from("properties")
        .select(`*`)
        .eq("id", params.slug);

      if (error) {
        console.warn(error);
      } else if (data) {
        setProperty(data[0]);
      }
      setLoading(false);
    }

    getProperty();
  }, []);

  useEffect(() => {
    console.log(property);
  }, [property]);

  return (
    <>
      <title>Property | Regent Services</title>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              {property?.name}
            </h1>
            <p className="mt-2 text-sm text-gray-700">{property?.uuid}</p>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/properties">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Back
              </button>{" "}
            </Link>
            <Link href={"/properties/" + property?.id + "/edit"}>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
        <div className=" mb-8 sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs?.map((tab) => (
                <span
                  onClick={(e) => setCurrentTab(tab.name)}
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name == currentTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex cursor-pointer items-center border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.name == currentTab
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {currentTab == "Location" && (
        <div className="mt-[50px]">
          <iframe
            className="w-full"
            src={property?.google_maps}
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      {currentTab == "General" && (
        <>
          {property && (
            <div>
              <div>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {property.address_1} {property.address_2} {property.city},{" "}
                      {property.state} {property.zip}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Notes
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {property.notes}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Images
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <p>Image Previews</p>
                    </dd>
                  </div>
                  {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Materials
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-100 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                resume_back_end_developer.pdf
                              </span>
                              <span className="flex-shrink-0 text-gray-400">
                                2.4mb
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                coverletter_back_end_developer.pdf
                              </span>
                              <span className="flex-shrink-0 text-gray-400">
                                4.5mb
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div> */}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Map
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {property.map ? (
                        <img src={property.map} className="h-auto w-full" />
                      ) : (
                        <div>No Map</div>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Back
            </button>
            <Link href={"/properties/" + property?.id + "/edit"}>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </Link>
          </div>
        </>
      )}

      {currentTab == "Open Issues" && (
        <>
          <PropertyIssues id={params.slug} />
        </>
      )}
    </>
  );
}

export default Property;
