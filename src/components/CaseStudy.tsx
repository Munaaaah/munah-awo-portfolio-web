import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../../public/arrow-right.svg";
import RichText from "@/app/contentful/RichText";
import { parseContentfulContentImage } from "@/app/contentful/contentImage";
import DisplayComponent from "@/components/DisplayComponent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* Split a Contentful long-text field into paragraphs */
const toParagraphs = (text?: string): string[] =>
  typeof text === "string"
    ? text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

/* Body copy — 16px/24 white, per design */
const Paragraphs = ({ text }: { text?: string }) => {
  const paragraphs = toParagraphs(text);
  if (!paragraphs.length) return null;
  return (
    <div className="space-y-6 text-[16px] leading-6 tracking-[-0.32px] font-medium text-white lg:w-[628px]">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
};

/* Italic callout with the vertical bar, e.g. "The Problem : ..." */
const Callout = ({ text }: { text?: string }) => {
  if (typeof text !== "string" || !text.trim()) return null;
  const colonIndex = text.indexOf(":");
  const label =
    colonIndex > 0 && colonIndex < 40 ? text.slice(0, colonIndex) : null;
  const rest = label ? text.slice(colonIndex + 1) : text;
  return (
    <div className="relative pl-[25px] lg:w-[645px]">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-full rounded-[24px] bg-[#AAAAAAAB]" />
      <p className="italic text-[#AAAAAA] text-[16px] leading-6 tracking-[-0.32px] font-medium">
        {label ? (
          <>
            <span className="font-bold">{label.trim()}</span>
            {" : "}
            {rest.trim()}
          </>
        ) : (
          rest.trim()
        )}
      </p>
    </div>
  );
};

/* Section heading — 24px Creato Bold, per design */
const SectionHeading = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className="text-[24px] leading-8 tracking-[-0.48px] font-bold text-white scroll-mt-28"
  >
    {children}
  </h2>
);

const PillButton = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    target="_blank"
    className="bg-[#27272A] border-[0.3px] border-[#FFFFFF4D] rounded-[24px] h-[43px] min-w-[149px] w-fit px-[18px] flex items-center justify-center gap-[6px] text-[14.65px] leading-[19.5px] tracking-[-0.29px] font-medium text-white"
  >
    {text}
    <Image
      src={ArrowRight}
      alt=""
      width={20}
      height={20}
      className="-rotate-[35deg] w-[20px] h-[20px]"
    />
  </Link>
);

/* Friendly not-found / error state */
export const CaseStudyNotFound = ({
  label = "Project",
}: {
  label?: string;
}) => (
  <>
    <Header />
    <main className="text-white font-creatoDisplay bg-[#09090B] min-h-[60vh] flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-[24px] leading-8 tracking-[-0.48px] font-bold">
        {label} not found
      </h1>
      <p className="text-[#AAAAAA] text-[16px] leading-6 tracking-[-0.32px] font-medium text-center">
        This {label.toLowerCase()} may have been moved or is no longer
        available.
      </p>
      <Link
        href="/"
        className="bg-[#27272A] border-[0.3px] border-[#FFFFFF4D] rounded-[24px] h-[43px] px-[18px] flex items-center justify-center gap-[6px] text-[14.65px] font-medium"
      >
        Back to home
      </Link>
    </main>
    <Footer />
  </>
);

/* Full case-study page (used by both /project/[slug] and /craft/[slug]) */
const CaseStudy = ({ fields }: { fields: any }) => {
  /* ---- Existing Contentful fields ---- */
  const projectName = fields?.projectName;
  const projectType = fields?.projectType;
  const liveWebsiteUrl = fields?.liveWebsiteUrl;
  const figmaPrototypeLink = fields?.figmaPrototypeLink;
  const videoLink = fields?.videoLink;
  const projectWebImage = fields?.projectWebImage;
  const backgroundImage =
    fields?.backgroundImage &&
    parseContentfulContentImage(fields?.backgroundImage);
  const client = fields?.client;
  const role = fields?.role;
  const introduction = fields?.introduction;
  const aboutProject = fields?.aboutProject;
  const sections = fields?.sections;

  /* ---- New fields (optional on Contentful; render gracefully if absent) ---- */
  const caseStudyTitle =
    fields?.caseStudyTitle ||
    `${projectName || ""}${projectType ? ` : ${projectType}` : ""}`;
  const timeline = fields?.timeline;
  const tools = fields?.tools;
  const scope = fields?.scope;
  const team = fields?.team || client;
  const overview = fields?.overview || aboutProject;
  const problemStatement = fields?.problemStatement;
  const overviewSummary = fields?.overviewSummary;
  const challenge = fields?.challenge;
  const solution = fields?.solution;
  const impact = fields?.impact;
  const impactHighlights: string[] = Array.isArray(fields?.impactHighlights)
    ? fields.impactHighlights.filter((h: unknown) => typeof h === "string")
    : [];
  const learnings = fields?.learnings;

  const cover =
    backgroundImage ||
    (projectWebImage && parseContentfulContentImage(projectWebImage));

  const hasOverview = Boolean(
    overview || problemStatement || overviewSummary || introduction,
  );
  const hasSolution = Boolean(solution || sections?.length);

  const tocItems = [
    { label: "Overview", href: "#overview", show: hasOverview },
    {
      label: "Problem / Solution",
      href: "#overview",
      show: Boolean(problemStatement),
    },
    { label: "Challenge", href: "#challenge", show: Boolean(challenge) },
    { label: "Solution", href: "#solution", show: hasSolution },
    {
      label: "Impact (what changed)",
      href: "#impact",
      show: Boolean(impact || impactHighlights.length),
    },
    { label: "What i learned", href: "#learnings", show: Boolean(learnings) },
  ].filter((item) => item.show);

  const metaRow1 = [
    { label: "Timeline", value: timeline, width: "lg:w-[170px]" },
    { label: "Role", value: role, width: "lg:w-[208px]" },
    { label: "Tools", value: tools, width: "" },
  ].filter((m) => m.value);

  const metaRow2 = [
    { label: "Scope", value: scope, width: "lg:w-[373px]" },
    { label: "Team", value: team, width: "" },
  ].filter((m) => m.value);

  return (
    <>
      <Header />
      <main className="text-white font-creatoDisplay bg-[#09090B] lg:max-w-[1440px] lg:mx-auto pb-20 lg:pb-[140px]">
        <div className="flex flex-col lg:flex-row p-6 lg:p-0 lg:pt-[72px] lg:pl-[111px]">
          {/* Sidebar */}
          <aside className="lg:w-[326px] shrink-0 lg:sticky lg:top-10 self-start">
            <Link
              href="/"
              className="flex items-center gap-[12px] py-[12px] lg:p-[14.65px] w-fit text-[#AAAAAA] text-[14.65px] leading-[19.5px] tracking-[-0.29px] font-medium"
            >
              <Image
                src={ArrowRight}
                alt=""
                width={20}
                height={20}
                className="rotate-180 opacity-70 w-[20px] h-[20px]"
              />
              Back to home
            </Link>

            <div className="hidden lg:block bg-[#FFFFFF33] h-[1px] w-full mt-[25px]"></div>

            {tocItems.length ? (
              <nav className="hidden lg:flex flex-col gap-[24px] mt-[41px] pl-[5px]">
                {tocItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-[#AAAAAA] hover:text-white transition-colors text-[16px] leading-6 tracking-[-0.32px] font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </aside>

          {/* Content column */}
          <div className="lg:ml-[68px] lg:w-[703px] lg:pt-[36px] mt-6 lg:mt-0">
            <h1 className="text-[24px] leading-8 tracking-[-0.48px] font-bold text-white">
              {caseStudyTitle}
            </h1>

            {(liveWebsiteUrl || figmaPrototypeLink) && (
              <div className="mt-[26px] flex flex-wrap items-center gap-3">
                {liveWebsiteUrl && (
                  <PillButton href={liveWebsiteUrl} text="View Live App" />
                )}
                {figmaPrototypeLink && (
                  <PillButton href={figmaPrototypeLink} text="View Prototype" />
                )}
              </div>
            )}

            {/* Cover */}
            {cover?.src ? (
              <div className="mt-[32px] relative w-full lg:w-[610px] h-[220px] lg:h-[351px] rounded-[24px] overflow-hidden">
                <Image
                  src={`https:${cover.src}`}
                  alt={cover.alt || caseStudyTitle}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 610px, 100vw"
                />
              </div>
            ) : videoLink ? (
              <video
                src={videoLink}
                autoPlay
                muted
                playsInline
                loop
                className="mt-[32px] w-full lg:w-[610px] h-[220px] lg:h-[351px] rounded-[24px] object-cover"
              />
            ) : null}

            {/* Meta */}
            {metaRow1.length || metaRow2.length ? (
              <div className="mt-[84px] flex flex-col gap-[35px] text-[16px] leading-6 tracking-[-0.32px] font-medium">
                {metaRow1.length ? (
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
                    {metaRow1.map((m, i) => (
                      <div key={i} className={`flex flex-col gap-2 ${m.width}`}>
                        <p className="text-[#AAAAAA]">{m.label}</p>
                        <p className="text-white pr-6">{m.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {metaRow2.length ? (
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
                    {metaRow2.map((m, i) => (
                      <div key={i} className={`flex flex-col gap-2 ${m.width}`}>
                        <p className="text-[#AAAAAA]">{m.label}</p>
                        <p className="text-white pr-6 lg:max-w-[241px]">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Overview */}
            {hasOverview && (
              <section className="mt-[88px]">
                <SectionHeading id="overview">Overview</SectionHeading>
                <div className="mt-[22px]">
                  {overview ? (
                    <Paragraphs text={overview} />
                  ) : introduction ? (
                    <div className="text-[16px] leading-6 tracking-[-0.32px] font-medium lg:w-[628px]">
                      <RichText document={introduction} />
                    </div>
                  ) : null}
                </div>
                {problemStatement && (
                  <div className="mt-[33px]">
                    <Callout text={problemStatement} />
                  </div>
                )}
                {overviewSummary && (
                  <div className="mt-[33px] lg:w-[649px]">
                    <Paragraphs text={overviewSummary} />
                  </div>
                )}
              </section>
            )}

            {/* The Challenge */}
            {challenge && (
              <section className="mt-[108px]">
                <SectionHeading id="challenge">The Challenge</SectionHeading>
                <div className="mt-[22px]">
                  <Paragraphs text={challenge} />
                </div>
              </section>
            )}

            {/* Solution */}
            {hasSolution && (
              <section className="mt-[108px]">
                <SectionHeading id="solution">Solution</SectionHeading>
                {solution && (
                  <div className="mt-[22px]">
                    <Paragraphs text={solution} />
                  </div>
                )}
                {sections?.length ? (
                  <DisplayComponent sections={sections} />
                ) : null}
              </section>
            )}

            {/* Impact */}
            {impact || impactHighlights.length ? (
              <section className="mt-[108px]">
                <SectionHeading id="impact">
                  Impact (What changed)
                </SectionHeading>
                {impact && (
                  <div className="mt-[22px]">
                    <Paragraphs text={impact} />
                  </div>
                )}
                {impactHighlights.length ? (
                  <div className="mt-[41px] flex flex-col gap-[30px]">
                    {impactHighlights.map((highlight, index) => (
                      <Callout key={index} text={highlight} />
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}

            {/* Learnings */}
            {learnings && (
              <section className="mt-[120px]">
                <SectionHeading id="learnings">Learnings</SectionHeading>
                <div className="mt-[22px]">
                  <Paragraphs text={learnings} />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;
