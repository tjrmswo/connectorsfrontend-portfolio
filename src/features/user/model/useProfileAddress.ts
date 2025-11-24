import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProfileFormData } from "./profileSchema";

export default function useProfileAddress({
  setValue,
}: {
  setValue: UseFormSetValue<ProfileFormData>;
  watch: UseFormWatch<ProfileFormData>;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleDrawer = () => {
    // Drawer 열 때만 초기화
    setValue("address.roadAddress", "", { shouldValidate: false });
    setValue("address.zipCode", "", { shouldValidate: false });
    setValue("address.detailAddress", "", { shouldValidate: false });
    setOpen(false);
  };

  const handleConfirm = () => {
    // 로직 구성
    setOpen(false);
  };

  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    console.log("주소 데이터: ", data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log("Selected address:", fullAddress);
    console.log("Postal code:", data.zonecode);

    // react-hook-form에 등록
    setValue("address.roadAddress", fullAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("address.zipCode", data.zonecode, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOpen(false);
  };

  return { open, handleDrawer, handleConfirm, handleComplete, handleOpen };
}
