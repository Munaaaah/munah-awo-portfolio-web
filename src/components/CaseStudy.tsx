import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../../public/arrow-right.svg";
import RichText from "@/app/contentful/RichText";
import { parseContentfulContentImage } from "@/app/contentful/contentImage";
import DisplayComponent from "@/components/DisplayComponent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type TocItem = {
  label: string;
  href: string;
};

const normalizeHref = (href?: string): string | null => {
  if (typeof href !== "string") return null;
  const trimmed = href.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
};

const normalizeTocItems = (raw: any): TocItem[] => {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item): TocItem | null => {
      const label =
        item?.label ||
        item?.title ||
        item?.fields?.label ||
        item?.fields?.title;
      const href =
        item?.href ||
        item?.fields?.href ||
        item?.anchor ||
        item?.fields?.anchor;
      const normalizedHref = normalizeHref(href);

      if (typeof label !== "string" || !label.trim() || !normalizedHref) {
        return null;
      }

      return {
        label: label.trim(),
        href: normalizedHref,
      };
    })
    .filter((item): item is TocItem => Boolean(item));
};

/* Turn a section title into a stable anchor id, e.g. "The Challenge" -> "the-challenge" */
const slugifyAnchor = (value?: string): string =>
  typeof value === "string"
    ? value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    : "";

type CaseStudySection = {
  id: string;
  title: string;
  sidebarLabel: string;
  body?: string;
  richText?: any;
  callout?: string;
  highlights: string[];
  blocks?: any[];
  hideFromSidebar: boolean;
};

/* Normalize entries from a `caseStudySections` reference list on Contentful.
   Each entry may define: title, sidebarLabel, anchor, body (long text),
   richText, callout, highlights (list), blocks (refs to image/richText items),
   hideFromSidebar. Only title is required. */
const normalizeCaseStudySections = (raw: any): CaseStudySection[] => {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item): CaseStudySection | null => {
      const f = item?.fields || item;
      const title = typeof f?.title === "string" ? f.title.trim() : "";
      if (!title) return null;

      return {
        id: slugifyAnchor(f?.anchor) || slugifyAnchor(title),
        title,
        sidebarLabel:
          typeof f?.sidebarLabel === "string" && f.sidebarLabel.trim()
            ? f.sidebarLabel.trim()
            : title,
        body: typeof f?.body === "string" ? f.body : undefined,
        richText: f?.richText,
        callout: typeof f?.callout === "string" ? f.callout : undefined,
        highlights: Array.isArray(f?.highlights)
          ? f.highlights.filter((h: unknown) => typeof h === "string")
          : [],
        blocks: Array.isArray(f?.blocks) ? f.blocks : undefined,
        hideFromSidebar: Boolean(f?.hideFromSidebar),
      };
    })
    .filter((s): s is CaseStudySection => Boolean(s));
};

/* Split a Contentful long-text field into paragraphs */
const toParagraphs = (text?: string): string[] =>
  typeof text === "string"
    ? text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
const MD_IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

type MediaSegment = { type: "image" | "video"; src: string; alt: string };

const toMedia = (url: string, alt: string): MediaSegment => {
  const src = url.startsWith("//") ? `https:${url}` : url;
  return { type: VIDEO_EXT.test(src) ? "video" : "image", src, alt };
};

/* Split text into text/media segments. Handles `![alt](url)` inserted by
   Contentful's "Insert media" in long-text fields (inline or standalone)
   and bare asset URLs on their own line */
const splitMediaSegments = (text: string): (string | MediaSegment)[] => {
  const segments: (string | MediaSegment)[] = [];
  let last = 0;
  for (const m of text.matchAll(MD_IMAGE_RE)) {
    const before = text.slice(last, m.index).trim();
    if (before) segments.push(before);
    segments.push(toMedia(m[2], m[1].trim()));
    last = (m.index as number) + m[0].length;
  }
  const rest = text.slice(last).trim();
  if (rest) {
    if (
      /^(https?:)?\/\/\S+\.(mp4|webm|mov|m4v|png|jpe?g|gif|webp|avif|svg)(\?\S*)?$/i.test(
        rest,
      )
    ) {
      segments.push(toMedia(rest, ""));
    } else {
      segments.push(rest);
    }
  }
  return segments;
};

const MediaEmbed = ({ media }: { media: MediaSegment }) =>
  media.type === "video" ? (
    <video
      src={media.src}
      autoPlay
      muted
      loop
      playsInline
      controls
      className="w-full "
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.src} alt={media.alt} className="w-full " />
  );

/* Body copy — Inter 16px/1.6, ~700px measure. Supports `**bold**` inline and
   fully-bold lines as sub-headings (H3 20px/1.3) */
const BOLD_RE = /\*\*([^*]+)\*\*/g;

const renderInlineBold = (text: string): React.ReactNode => {
  const parts = text.split(BOLD_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-white">
        {part}
      </strong>
    ) : (
      part
    ),
  );
};

const isBoldHeading = (p: string) => /^\*\*[^*]+\*\*$/.test(p.trim());

const Paragraphs = ({ text }: { text?: string }) => {
  const paragraphs = toParagraphs(text);
  if (!paragraphs.length) return null;
  return (
    <div className="text-[16px] leading-[24px] tracking-[-0.32px] text-[#AAAAAA] max-w-[703px]">
      {paragraphs.flatMap((p, i) =>
        splitMediaSegments(p).map((segment, j) =>
          typeof segment === "string" ? (
            isBoldHeading(segment) ? (
              <h3
                key={`${i}-${j}`}
                className="text-[18px] leading-[24px] tracking-[-0.36px] font-bold text-white mb-[6px] [&:not(:first-child)]:mt-6"
              >
                {segment.trim().replace(/^\*\*|\*\*$/g, "")}
              </h3>
            ) : (
              <p key={`${i}-${j}`} className="mb-6 last:mb-0">
                {renderInlineBold(segment)}
              </p>
            )
          ) : (
            <div key={`${i}-${j}`} className="pt-2 mb-8 last:mb-0">
              <MediaEmbed media={segment} />
            </div>
          ),
        ),
      )}
    </div>
  );
};

/* Italic callout with the vertical bar, e.g. "The Problem : ..." */
const Callout = ({ text }: { text?: string }) => {
  if (typeof text !== "string" || !text.trim()) return null;

  const segments = splitMediaSegments(text.trim());
  const mediaSegments = segments.filter(
    (s): s is MediaSegment => typeof s !== "string",
  );
  const plainText = segments
    .filter((s): s is string => typeof s === "string")
    .join(" ");

  const colonIndex = plainText.indexOf(":");
  const label =
    colonIndex > 0 && colonIndex < 40 ? plainText.slice(0, colonIndex) : null;
  const rest = label ? plainText.slice(colonIndex + 1) : plainText;

  return (
    <div className="flex flex-col gap-6">
      {plainText ? (
        <div className="relative pl-[25px] max-w-[568px]">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-full rounded-[24px] bg-[#AAAAAAAB]" />
          <p className="italic font-bold text-[#AAAAAA] text-[16px] leading-[24px] tracking-[-0.32px]">
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
      ) : null}
      {mediaSegments.map((media, i) => (
        <div key={i} className="max-w-[703px]">
          <MediaEmbed media={media} />
        </div>
      ))}
    </div>
  );
};

/* Section heading — H2 32px/1.2 per type scale */
const SectionHeading = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className="text-[28px] leading-[32px] tracking-[-0.56px] font-bold text-white scroll-mt-28"
  >
    {children}
  </h2>
);

const PillButton = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    target="_blank"
    className="flex items-center gap-[8px] w-fit text-[18px] leading-[19.54px] tracking-[-0.36px] font-bold text-white underline decoration-solid underline-offset-2"
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
    <main className="text-white font-aspekta bg-[#09090B] min-h-[60vh] flex flex-col items-center justify-center gap-6 p-6">
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

  /* Fully dynamic content: ordered list of section entries per project */
  const dynamicSections = normalizeCaseStudySections(
    fields?.caseStudySections || fields?.contentSections,
  );

  const visibleDynamicSections = dynamicSections.filter(
    (section) =>
      Boolean(section.body) ||
      Boolean(section.richText) ||
      Boolean(section.callout) ||
      Boolean(section.highlights.length) ||
      Boolean(section.blocks?.length),
  );

  const cover =
    backgroundImage ||
    (projectWebImage && parseContentfulContentImage(projectWebImage));

  const hasOverview = Boolean(
    overview || problemStatement || overviewSummary || introduction,
  );
  const hasSolution = Boolean(solution || sections?.length);

  const defaultTocItems = [
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
  ]
    .filter((item) => item.show)
    .map(({ label, href }) => ({ label, href }));

  const customTocItems = normalizeTocItems(
    fields?.sidebarItems || fields?.tocItems,
  );
  const dynamicTocItems = visibleDynamicSections
    .filter((s) => !s.hideFromSidebar)
    .map((s) => ({ label: s.sidebarLabel, href: `#${s.id}` }));
  const tocItems = customTocItems.length
    ? customTocItems
    : dynamicTocItems.length
      ? dynamicTocItems
      : defaultTocItems;

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
      <main className="text-white font-aspekta bg-[#09090B] lg:max-w-[1440px] lg:mx-auto pb-20 lg:pb-[98px]">
        <div className="flex flex-col lg:flex-row p-6 lg:p-0 lg:pt-[30px] lg:pl-[111px]">
          {/* Sidebar */}
          <aside className="lg:w-[326px] shrink-0 lg:sticky lg:top-10 self-start">
            <Link
              href="/"
              className="flex items-center gap-[12px] py-[12px] lg:p-[14.65px] w-fit text-[#AAAAAA] text-[14.65px] leading-[19.54px] tracking-[-0.29px] font-normal"
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
              <nav className="hidden lg:flex flex-col gap-[24px] mt-[40px] pl-[5px]">
                {tocItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-[#AAAAAA] hover:text-white transition-colors text-[16px] leading-6 tracking-[-0.32px] font-normal"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </aside>

          {/* Content column */}
          <div className="lg:ml-[46px] lg:w-[822px] lg:bg-[#131315] lg:rounded-[8px] lg:px-[48px] lg:pt-[48px] lg:pb-[176px] mt-6 lg:mt-[108px]">
            <h1 className="text-[28px] leading-[36px] tracking-[-0.56px] font-bold text-white">
              {caseStudyTitle}
            </h1>

            {(liveWebsiteUrl || figmaPrototypeLink) && (
              <div className="mt-[32px] flex flex-wrap items-center gap-6">
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
              <div className="mt-[29px] relative w-full lg:w-[744px] lg:-ml-[5px] h-[220px] lg:h-[447px] overflow-hidden">
                <Image
                  src={`https:${cover.src}`}
                  alt={cover.alt || caseStudyTitle}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 744px, 100vw"
                />
              </div>
            ) : videoLink ? (
              <video
                src={videoLink}
                autoPlay
                muted
                playsInline
                loop
                className="mt-[29px] w-full lg:w-[744px] lg:-ml-[5px] h-[220px] lg:h-[447px] object-cover"
              />
            ) : null}

            {/* Meta */}
            {metaRow1.length || metaRow2.length ? (
              <div className="mt-[77px] flex flex-col gap-[35px] text-[16px] leading-6 tracking-[-0.32px] font-medium">
                {metaRow1.length ? (
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
                    {metaRow1.map((m, i) => (
                      <div key={i} className={`flex flex-col gap-2 ${m.width}`}>
                        <p className="text-[#AAAAAA] text-[14px] leading-6 tracking-[-0.28px] font-normal uppercase">
                          {m.label}
                        </p>
                        <p className="text-white pr-6">{m.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {metaRow2.length ? (
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
                    {metaRow2.map((m, i) => (
                      <div key={i} className={`flex flex-col gap-2 ${m.width}`}>
                        <p className="text-[#AAAAAA] text-[14px] leading-6 tracking-[-0.28px] font-normal uppercase">
                          {m.label}
                        </p>
                        <p className="text-white pr-6 lg:max-w-[241px]">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Dynamic sections (per-project, ordered on Contentful) */}
            {visibleDynamicSections.length ? (
              visibleDynamicSections.map((section, index) => (
                <section
                  key={section.id || index}
                  className={
                    index === 0
                      ? "mt-[48px] border-t border-[#2A2A2C] pt-[98px]"
                      : "mt-[56px] border-t border-[#2A2A2C] pt-[80px]"
                  }
                >
                  <SectionHeading id={section.id}>
                    {section.title}
                  </SectionHeading>
                  {section.body && (
                    <div className="mt-[32px]">
                      <Paragraphs text={section.body} />
                    </div>
                  )}
                  {section.richText && (
                    <div className="mt-[32px] text-[16px] leading-[24px] tracking-[-0.32px] text-[#AAAAAA] max-w-[703px]">
                      <RichText document={section.richText} />
                    </div>
                  )}
                  {section.callout && (
                    <div className="mt-[55px]">
                      <Callout text={section.callout} />
                    </div>
                  )}
                  {section.highlights.length ? (
                    <div className="mt-[41px] flex flex-col gap-[30px]">
                      {section.highlights.map((highlight, i) => (
                        <Callout key={i} text={highlight} />
                      ))}
                    </div>
                  ) : null}
                  {section.blocks?.length ? (
                    <DisplayComponent sections={section.blocks} />
                  ) : null}
                </section>
              ))
            ) : (
              <>
                {/* Overview */}
                {hasOverview && (
                  <section className="mt-[48px] border-t border-[#2A2A2C] pt-[98px]">
                    <SectionHeading id="overview">Overview</SectionHeading>
                    <div className="mt-[32px]">
                      {overview ? (
                        <Paragraphs text={overview} />
                      ) : introduction ? (
                        <div className="text-[16px] leading-[24px] tracking-[-0.32px] text-[#AAAAAA] max-w-[703px]">
                          <RichText document={introduction} />
                        </div>
                      ) : null}
                    </div>
                    {problemStatement && (
                      <div className="mt-[55px]">
                        <Callout text={problemStatement} />
                      </div>
                    )}
                    {overviewSummary && (
                      <div className="mt-[55px] lg:w-[689px]">
                        <Paragraphs text={overviewSummary} />
                      </div>
                    )}
                  </section>
                )}

                {/* The Challenge */}
                {challenge && (
                  <section className="mt-[56px] border-t border-[#2A2A2C] pt-[80px]">
                    <SectionHeading id="challenge">
                      The Challenge
                    </SectionHeading>
                    <div className="mt-[32px]">
                      <Paragraphs text={challenge} />
                    </div>
                  </section>
                )}

                {/* Solution */}
                {hasSolution && (
                  <section className="mt-[56px] border-t border-[#2A2A2C] pt-[80px]">
                    <SectionHeading id="solution">Solution</SectionHeading>
                    {solution && (
                      <div className="mt-[32px]">
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
                  <section className="mt-[56px] border-t border-[#2A2A2C] pt-[80px]">
                    <SectionHeading id="impact">
                      Impact (What changed)
                    </SectionHeading>
                    {impact && (
                      <div className="mt-[32px]">
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
                  <section className="mt-[56px] border-t border-[#2A2A2C] pt-[80px]">
                    <SectionHeading id="learnings">Learnings</SectionHeading>
                    <div className="mt-[32px]">
                      <Paragraphs text={learnings} />
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;
