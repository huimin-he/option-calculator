"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  href?: string;
  label: string;
  current: boolean;
}

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = (className) => {
  const pathname = usePathname();

  if (pathname === "/") {
    // If we're on the homepage, return null to render nothing
    return null;
  }

  // create an array of path segments
  const segments = pathname.split("/").filter((segment: any) => segment);

  // create breadcrumb items from path segments
  const breadcrumbItems: BreadcrumbItem[] = segments.map(
    (segment: any, index: number, arr: string | any[]) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      return {
        href: index < arr.length - 1 ? href : undefined,
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        current: index === arr.length - 1,
      };
    }
  );

  // Add "Home" to the start of the breadcrumbItems array
  breadcrumbItems.unshift({
    href: "/",
    label: "Home",
    current: pathname === "/",
  });

  return (
    <>
      <div className={`relative mt-2 mx-4 sm:mx-0 sm:mt-0`}>
        <nav className="" aria-label="Breadcrumb">
          <div className="flex items-center space-x-0">
            {breadcrumbItems.map((item) => (
              <button key={item.label}>
                <div className="flex items-center">
                  {item.href ? (
                    <Link href={item.href}>
                      <label className="hover:border-b-2 border-black text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
                        {item.label}
                      </label>
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-gray-900">
                      {item.label}
                    </span>
                  )}

                  {!item.current && (
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div></div>
        </nav>
      </div>
    </>
  );
};

export default Breadcrumb;
