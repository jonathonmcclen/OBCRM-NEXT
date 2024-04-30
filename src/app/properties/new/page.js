"use client";
import { useState, useEffect } from "react";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function NewProperty({ params }) {
  //check if editing
  // const params = useParams();
  // const { id } = params;

  const [name, setName] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (params.slug) {
      async function getProperty() {
        let { data, error } = await supabase
          .from("properties")
          .select(`*`)
          .eq("id", params.slug)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          console.log(data);
          setName(data.name);
          setAddress_1(data.address_1);
          setAddress_2(data.address_2);
          setCity(data.city);
          setState(data.state);
          setZip(data.zip);
          setNotes(data.notes);
        }
      }

      getProperty();
    }
  }, []);

  const handleCreateProperty = async function () {
    if (params.slug) {
      const { data, error } = await supabase
        .from("properties")
        .update({
          name: name,
          address_1: address_1,
          address_2: address_2,
          city: city,
          state: state,
          zip: zip,
          notes: notes,
        })
        .eq("id", params.slug)
        .select();
      if (error) {
        console.warn(error);
      } else {
        window.location.href = "/properties";
      }
    } else {
      const { data, error } = await supabase
        .from("properties")
        .insert({
          name: name,
          address_1: address_1,
          address_2: address_2,
          city: city,
          state: state,
          zip: zip,
          notes: notes,
        })
        .select();
      if (error) {
        console.warn(error);
      } else {
        window.location.href = "/properties";
      }
    }
  };

  return (
    <>
      <div>
        <div className="mb-4 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">
              {name ? name : "New Property"}
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
              <button
                onClick={handleCreateProperty}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <form>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              address 1
            </label>
            <input
              onChange={(e) => setAddress_1(e.target.value)}
              value={address_1}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              address 2
            </label>
            <input
              onChange={(e) => setAddress_2(e.target.value)}
              value={address_2}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              State
            </label>
            <input
              onChange={(e) => setState(e.target.value)}
              value={state}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Zip
            </label>
            <input
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              notes
            </label>
            <textarea
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
          </div>
          <label htmlFor="name" className="text-sm leading-7 text-gray-600">
            Map
          </label>
          <div className=" mb-4 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, PDF up to 10MB
              </p>
            </div>
          </div>
        </form>
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
            onClick={handleCreateProperty}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default NewProperty;
