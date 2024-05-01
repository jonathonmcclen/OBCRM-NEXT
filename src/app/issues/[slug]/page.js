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
import DisplayIssue from "./displayIssue";

function Issue({ params }) {
  let issue = {};

  async function getIssue() {
    let { data, error } = await supabase
      .from("work_orders")
      .select(`*, properties (*)`)
      .eq("id", params.slug);

    if (error) {
      console.warn(error);
    } else if (data) {
      issue = data[0];
    }
  }

  getIssue();

  return (
    <>
      <meta
        name="description"
        content="This is a meta description. This text will show up in Google's search engine results page."
      />
      <meta
        name="description"
        content="This is a meta description. This text will show up in Google's search engine results page."
      />
      <title>{`${issue?.status} Issue ${issue?.id} | ${issue?.properties?.name} | ${issue?.description?.substring(0, 30)}`}</title>
      <DisplayIssue id={params.slug} />
    </>
  );
}

export default Issue;
