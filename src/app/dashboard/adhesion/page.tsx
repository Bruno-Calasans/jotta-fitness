import AdhesionTable from "@/components/dashboard/Adhesion/AdhesionTable";
import ContentContainer from "@/components/general/ContentContainer";

type AdhesionPageProps = {};

export default function AdhesionPage({}: AdhesionPageProps) {
  return (
    <ContentContainer>
      <AdhesionTable />
    </ContentContainer>
  );
}
