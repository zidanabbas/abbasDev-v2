import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import { BiBarcode } from "react-icons/bi";
import CertificatesCard from "@/app/about/components/CertificatesCard";
import { CertificatesList } from "@/components/dataDummy/CertificatesList";

export default function Certificates() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Certificates" icon={<BiBarcode className="mr-1" />} />
        <SubHeading>
          <p>My Current Certificates.</p>
        </SubHeading>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {CertificatesList.map((item, index) => {
          return (
            <CertificatesCard
              Index={index}
              key={index}
              berlaku={item.berlaku}
              diberikan={item.diberikan}
              description={item.description}
              image={item.image}
              slug={item.slug}
              title={item.title}
              id_certificate={item.id_certificate}
            />
          );
        })}
      </div>
      {/* <div className="">
        <SwiperCertificate />
      </div> */}
    </div>
  );
}
