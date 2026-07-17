import React from "react";
import getSlugDetails, {
  getProjectDetails,
} from "@/app/contentful/getSlugDetails";
import CaseStudy, { CaseStudyNotFound } from "@/components/CaseStudy";

// Re-generate the page in the background at most every 60s,
// so Contentful edits show up without a redeploy
export const revalidate = 60;

export async function generateStaticParams(): Promise<any[]> {
  const projects = await getProjectDetails();
  return projects || [];
}

const ProjectDetails = async ({ params }: any) => {
  const { _slug } = await params;

  let data: any = null;
  try {
    data = await getSlugDetails("projectCard", _slug);
  } catch (e) {
    data = null;
  }

  const fields = data?.content?.fields;

  if (!fields) {
    return <CaseStudyNotFound label="Project" />;
  }

  return <CaseStudy fields={fields} />;
};

export default ProjectDetails;
