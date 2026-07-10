import React from "react";
import {
  getCraftDetails,
  getCraftSlugDetails,
} from "@/app/contentful/getSlugDetails";
import CaseStudy, { CaseStudyNotFound } from "@/components/CaseStudy";

export async function generateStaticParams(): Promise<any[]> {
  const crafts = await getCraftDetails();
  return crafts || [];
}

const CraftDetails = async ({ params }: any) => {
  const { _slug } = await params;

  let data: any = null;
  try {
    data = await getCraftSlugDetails(_slug);
  } catch (e) {
    data = null;
  }

  const fields = data?.content?.fields;

  if (!fields) {
    return <CaseStudyNotFound label="Craft" />;
  }

  return <CaseStudy fields={fields} />;
};

export default CraftDetails;
