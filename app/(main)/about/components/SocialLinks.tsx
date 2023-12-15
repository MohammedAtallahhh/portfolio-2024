import { sanityClient } from "lib/sanity/client";
import { groq } from "next-sanity";
import { Suspense } from "react";
import { Social } from "types";
import { ArrowLink } from "components/ArrowLink";
import { NextSanityImage } from "components/NextSanityImage";
import { Skeleton } from "components/Skeleton";
import { SkeletonText } from "components/SkeletonText";
import Link from "next/link";

const query = groq`
*[_type == "social"] {
  _id,
  networkName,
  link,
  userName,
  icon {
    asset->{
      _id,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    }
  }
}
`;

export async function SocialLinks() {
  return (
    <section className="md:min-w-[300px]">
      <h3 className="font-heading text-4xl mb-8">Social links</h3>

      <ul className="flex flex-col space-y-2">
        <Suspense fallback={<SocialLinksListLoading />}>
          {/* @ts-ignore */}
          <SocialLinksList />
        </Suspense>
      </ul>
    </section>
  );
}

async function SocialLinksList() {
  const socialLinks: Social[] = await sanityClient.fetch(query);
  await new Promise(r => setTimeout(r, parseInt(process.env.NEXT_PUBLIC_ARTIFICIAL_DELAY)));

  return (
    <>
      {socialLinks.map(socialData => {
        return <SocialLinkItem key={socialData._id} {...socialData} />;
      })}
    </>
  );
}

function SocialLinksListLoading() {
  return (
    <>
      <SocialLinkItemLoading />
      <SocialLinkItemLoading />
      <SocialLinkItemLoading />
      <SocialLinkItemLoading />
      <SocialLinkItemLoading />
    </>
  );
}

export function SocialLinkItem({ icon, networkName, link, userName }: Omit<Social, "_id">) {
  return (
    <li>
      <Link
        href={link ?? ""}
        className="text-primary font-semibold no-underline hover:underline flex items-center gap-2"
      >
        <div className="inline-block">
          <NextSanityImage
            image={icon}
            placeholder="empty"
            height={32}
            width={32}
            alt={`${networkName} icon`}
          />
        </div>

        <span className="font-subheading font-semibold text-lg">{userName}</span>
        <span>→</span>
      </Link>
    </li>
  );
}

export function SocialLinkItemLoading() {
  return (
    <div className="flex flex-row space-x-2 pb-1 items-center">
      <Skeleton className="w-6 h-6 rounded-lg" />
      <SkeletonText className="w-28 h-[1.25rem] " />
    </div>
  );
}
