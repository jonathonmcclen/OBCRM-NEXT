"use client";
import { useState, useEffect } from "react";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/hooks/Auth";

const TITLE = "Title";
const SUB_TITLE = "SubTitle";
const CHECKBOX = "CheckBox";
const SCALE = "Scale";
const TEXT = "Text";
const TEXT_AREA = "TextArea";

const json = [
  ["Kitchen sink", "Text", "ther is one kitchen on floor 1"],
  ["Floor 1", "Title"],
  ["Carpets", "CheckBox", "description carpets"],
  ["Laminate", "CheckBox", "description Laminate"],
  ["kitchen 1 1", "Title"],
  ["Sink", "CheckBox", "description carpets"],
  ["Fridge", "CheckBox", "description Laminate"],
  ["Foyer", "Scale", "description Laminate"],
];

function getInput(input) {
  switch (input[1]) {
    case TITLE:
      return (
        <>
          <h2 className="text-2xl">{input[0]}</h2>
          <hr />
        </>
      );
    case CHECKBOX:
      return (
        <>
          <div className="relative flex items-start divide-y divide-gray-200 pb-4 pt-3.5">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={input[0]} className="font-medium text-gray-900">
                {input[0]}
              </label>
              <p id="comments-description" className="text-gray-500">
                {input[2]}
              </p>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id={input[0]}
                aria-describedby="comments-description"
                name={input[0]}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
        </>
      );
    case SCALE:
      return (
        <>
          <div className="relative mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {input[0]}
            </label>
            <select
              id={input[0]}
              name={input[0]}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue=" "
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
        </>
      );
    case TEXT:
      return (
        <>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              {input[0]}
            </label>
            <input
              type="text"
              key={input[0]}
              id={input[0]}
              name={input[0]}
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </>
      );
    case TEXT_AREA:
      return "bar";
    default:
      return "foo";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  let data = new FormData(e.target);
  console.log(data);
  console.log([...data.entries()]);
}

function NewWalkthrough({ params }) {
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [property, setProperty] = useState();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // get the reporters information
  useEffect(() => {
    if (user) {
      const getProfileInfo = async function () {
        let { data, error } = await supabase
          .from("profiles")
          .select(`simp_id, username`)
          .eq("id", user.id)
          .single();

        setCurrentUser(data);
      };

      getProfileInfo();
    } else {
    }
  }, []);

  //get properties list for select input
  useEffect(() => {
    async function getProperties() {
      setLoading(true);
      let { data, error } = await supabase.from("properties").select(`*`);
      if (error) {
        console.warn(error);
      } else if (data) {
        setProperties(data);
      }
      setLoading(false);
    }
    getProperties();
  }, []);

  // create issue
  const handleCreateWalkthrough = async function () {
    if (params.slug) {
      const { data, error } = await supabase
        .from("walkthroughs")
        .update([
          {
            reporter: currentUser.simp_id,
            notes: description,
            property: property,
          },
        ])
        .eq("id", params.slug)
        .select();
      if (error) {
        console.warn(error);
      } else {
        if (params.property) {
          window.location.href = "/walkthroughs/" + params.property;
        } else {
          window.location.href = "/walkthroughs";
        }
      }
    } else {
      const { data, error } = await supabase
        .from("walkthroughs")
        .insert([
          {
            reporter: currentUser.simp_id,
            notes: description,
            property: property,
          },
        ])
        .select();
      if (error) {
        console.warn(error);
      } else {
        if (params.property) {
          window.location.href = "/walkthroughs/" + params.property;
        } else {
          window.location.href = "/walkthroughs";
        }
      }
    }
  };

  const [today, setToday] = useState("");

  //get properties list for select input
  useEffect(() => {
    const todaysDate = new Date();
    let day = "";

    switch (todaysDate.getDay()) {
      case 0:
        day = "Sun";
      case 1:
        day = "Mon";
      case 2:
        day = "Tue";
      case 3:
        day = "Wed";
      case 4:
        day = "Thur";
      case 5:
        day = "Fri";
      case 6:
        day = "Sat";
    }

    setToday(
      `${day} ${todaysDate.getDate()}, ${todaysDate.getMonth()} / ${todaysDate.getFullYear()}`,
    );
  }, []);

  return (
    <>
      <div>
        <div className="mb-4 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              Walkthrough
            </h1>
            <h1 className="mt-2 text-2xl font-semibold leading-6 text-gray-900">
              {today}
            </h1>

            <p className="mt-2 text-sm text-gray-700">
              A list of all the properties in your account including their name,
              address, and notes.
            </p>
          </div>
          <div className="mt-4 gap-x-6 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link href="/properties">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>{" "}
              </Link>
              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </div>
        </div>
        {/* DYNAMIC FORMS */}
        {/* <form onSubmit={(e) => handleSubmit(e)}>
          <div className="relative mb-4">
            {json.map((section) => (
              <>{getInput(section)}</>
            ))}
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </form> */}
        <div className="relative mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location
          </label>
          <select
            onChange={(e) => setProperty(e.target.value)}
            value={property}
            id="location"
            name="location"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Canada"
          >
            <option value={""}>Select one</option>
            {properties?.map((prop) => (
              <option value={prop.id}>{prop.name}</option>
            ))}
          </select>
        </div>
        <div className="relative mb-4">
          <label className="text-sm leading-7 text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="name"
            name="name"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          ></textarea>
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Reporter
          </label>
          <input
            value={currentUser?.username}
            disabled
            type="text"
            name="postal-code"
            id="postal-code"
            autoComplete="postal-code"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/properties">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>{" "}
          </Link>
          <button
            onClick={handleCreateWalkthrough}
            // type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default NewWalkthrough;
