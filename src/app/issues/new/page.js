"use client";
import { useState, useEffect } from "react";
import { supabaseClient as supabase } from "../../../config/supabase-client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../hooks/Auth";
import Link from "next/link";

function NewIssue({ params }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [finalURL, setFinalURL] = useState();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    console.log(event.target.files[0]);
    handleUpload(event);
  };

  const handleUpload = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    setFinalURL(filePath);
    const { error: uploadError } = await supabase.storage
      .from("issues")
      .upload(filePath, file);
    if (uploadError) {
      throw uploadError;
    }
    // onUpload(filePath);
    setUploading(false);
  };

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [property, setProperty] = useState();
  const [status, setStatus] = useState("");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);
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

  // get current issue information
  useEffect(() => {
    if (params.property) {
      setProperty(parseInt(params.property));
    }

    if (params.slug) {
      async function getIssue() {
        let { data, error } = await supabase
          .from("work_orders")
          .select(`*, properties (*)`)
          .eq("id", params.slug)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          console.log(data);
          setType(data.type);
          setDescription(data.description);
          setProperty(data.properties.id);
          setStatus(data.status);
          setFinalURL(data.images[0]);
          let url =
            "https://bcnnvbpbwelebmdyvesf.supabase.co/storage/v1/object/public/issues/" +
            data.images[0];
          setImage(url);
        }
      }

      getIssue();
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
  const handleCreateIssue = async function () {
    if (params.slug) {
      const { data, error } = await supabase
        .from("work_orders")
        .update([
          {
            reporter: currentUser.simp_id,
            type: type,
            description: description,
            property: property,
            status: status,
            images: [finalURL],
          },
        ])
        .eq("id", params.slug)
        .select();
      if (error) {
        console.warn(error);
      } else {
        if (params.property) {
          window.location.href = "/properties/" + params.property;
        } else {
          window.location.href = "/issues";
        }
      }
    } else {
      const { data, error } = await supabase
        .from("work_orders")
        .insert([
          {
            reporter: currentUser.simp_id,
            type: type,
            description: description,
            property: property,
            status: status,
            images: [finalURL],
          },
        ])
        .select();
      if (error) {
        console.warn(error);
      } else {
        if (params.property) {
          window.location.href = "/properties/" + params.property;
        } else {
          window.location.href = "/issues";
        }
      }
    }
  };

  // useful for testing
  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <>
      <title>New Issues | Regent Services</title>
      <div>
        <div className="mb-4 sm:flex-auto">
          <h1 className="text-4xl font-semibold leading-6 text-gray-900">
            {uploading && <>LOADING</>}
            New Issue
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a brand new issue and connect it to a property so we cna
            connect you to the proper contact.
          </p>
        </div>
        <form>
          <div className="relative mb-4">
            <div className=" mb-4 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {!image && (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                {image && (
                  <img className="h-[500px]" src={image} alt="Preview" />
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>

                    <input
                      onChange={handleImageChange}
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
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type
              </label>
              <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                id="issue_type"
                name="issue_type"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value={""}>Select one</option>
                <option>Trash Interior</option>
                <option>Trash Exterior</option>
                <option>Stain Interior Carpet</option>
                <option>Stain Interior Tile/Other</option>
                <option>Stain Exterior Concrete</option>
                <option>Stain Exterior Wall</option>
                <option>Dirty Glass</option>
                <option>Broken Glass</option>
                <option>Bio</option>
                <option>Other</option>
              </select>
            </div>
            <div className="relative mb-4">
              <label className="text-sm leading-7 text-gray-600">
                Description
              </label>
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
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="location"
                name="location"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Open"
              >
                <option value={""}>Select one</option>
                <option>Open</option>
                <option>Followed Up{"(int)"}</option>
                <option>Awaiting Confirmation</option>
                <option>Not Complete</option>
                <option>Closed</option>
              </select>
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
          </div>{" "}
        </form>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/issues">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>{" "}
          </Link>
          <button
            onClick={handleCreateIssue}
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

export default NewIssue;
