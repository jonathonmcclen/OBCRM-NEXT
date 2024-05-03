"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { React, useState, useEffect } from "react";
import { supabaseClient as supabase } from "../../../config/supabase-client";

function NewContact({ params }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [salutation, setSalutation] = useState();
  const [gender, setGender] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState(" ");
  const [tags, setTags] = useState();
  const [type, setType] = useState();
  const [company, setCompany] = useState();
  const [regent, setRegent] = useState();

  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (params.slug) {
      async function getContact() {
        let { data, error } = await supabase
          .from("contacts")
          .select(`*`)
          .eq("id", params.slug)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          console.log(data);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setSalutation(data.salutation);
          setNumber(data.number);
          setEmail(data.email);
          setNotes(data.notes);
          setTags(data.tags);
          setType(data.type);
          setCompany(data.company);
          setRegent(data.regent);
          setAddressLineOne(data.address_1);
          setAddressLineTwo(data.address_2);
          setCity(data.city);
          setState(data.state);
          setZip(data.zip);
        }
      }

      getContact();
    }
  }, []);

  const handleCreateContact = async function () {
    if (params.slug) {
      const { data, error } = await supabase
        .from("contacts")
        .update([
          {
            first_name: firstName,
            last_name: lastName,
            salutation: salutation,
            gender: gender,
            number: number,
            email: email,
            notes: notes,
            tags: tags,
            type: type,
            company: company,
            regent: regent,
            address_1: addressLineOne,
            address_2: addressLineTwo,
            city: city,
            state: state,
            zip: zip,
          },
        ])
        .eq("id", params.slug)
        .select();

      if (error) {
        console.warn(error);
      } else {
        window.location.href = "/contacts";
      }
    } else {
      const { data, error } = await supabase
        .from("contacts")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            salutation: salutation,
            gender: gender,
            number: number,
            email: email,
            notes: notes,
            tags: tags,
            type: type,
            company: company,
            regent: regent,
            address_1: addressLineOne,
            address_2: addressLineTwo,
            city: city,
            state: state,
            zip: zip,
          },
        ])
        .select();
      if (error) {
        console.warn(error);
      } else {
        window.location.href = "/contacts";
      }
    }
  };

  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Salutation
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setSalutation(e.target.value)}
                    value={salutation}
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={"Mr."}>Mr.</option>
                    <option value={"Mrs."}>Mrs.</option>
                    <option value={"Miss"}>Miss</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    id="phone"
                    name="number"
                    type="text"
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-8">
                <div className="relative mb-4">
                  <label className="text-sm leading-7 text-gray-600">
                    Description
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    id="name"
                    name="name"
                    className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Line 1
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setAddressLineOne(e.target.value)}
                    value={addressLineOne}
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Line 2
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setAddressLineTwo(e.target.value)}
                    value={addressLineTwo}
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12"></div>
          <div className="relative mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Property
            </label>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="Canada"
            >
              <option>Select One</option>
              <option>Dynamic Property 1</option>
              <option>Dynamic Property 2</option>
              <option>Dynamic Property 3</option>
              <option>Dynamic Property 4</option>
            </select>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company
            </label>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="Canada"
            >
              <option>Select One</option>
              <option>Regent Services</option>
              <option>Dynamic Company 1</option>
              <option>Dynamic Company 2</option>
            </select>
          </div>
        </div>
      </form>{" "}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateContact}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default NewContact;
