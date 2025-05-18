import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type BreadcrumbData = {
  label: React.ReactNode;
  url: string;
};

type CustomBreadcrumbProps = {
  data: BreadcrumbData[];
  page: React.ReactNode;
};

export default function CustomBreadcrumb({
  data,
  page,
}: CustomBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((data, index) => (
          <div className="flex items-center gap-1" key={data.url + index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-white hover:text-orange-500 transition-all"
              >
                <Link href={data.url}>{data.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-orange-500 font-bold">
            {page}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
