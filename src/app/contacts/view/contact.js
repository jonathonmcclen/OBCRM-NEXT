import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import { PaperClipIcon } from "@heroicons/react/20/solid";

function Contact() {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState();
  const [contact, setContact] = useState();

  useEffect(() => {
    async function getContact() {
      setLoading(true);

      let { data, error } = await supabase
        .from("contacts")
        .select(`*`)
        .eq("id", id);

      if (error) {
        console.warn(error);
      } else if (data) {
        setContact(data[0]);
      }
      setLoading(false);
    }

    getContact();
  }, []);

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  return (
    <>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/contacts">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Back
          </button>{" "}
        </Link>
        <Link to={"/contacts/" + contact?.id + "/edit"}>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </Link>
      </div>
      {contact && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 px-4 py-6 sm:p-8">
          <div className="mt-[50px]">
            <div className="px-4 sm:px-0">
              <h3 className="text-4xl font-semibold leading-7 text-gray-900">
                {contact.salutation}
                {contact.first_name} {contact.last_name}
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    ID
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {contact.id}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {contact.type}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Tags
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {contact.tags}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {contact.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {contact.number}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    notes
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <p>{contact.notes}</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
