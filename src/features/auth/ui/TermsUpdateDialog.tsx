import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared";
import { memo } from "react";

interface TermsUpdateDialogProps {
  open: boolean;
  onConfirm: () => void;
}

export const TermsUpdateDialog = memo(
  ({ open, onConfirm }: TermsUpdateDialogProps) => {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent className="flex max-w-[320px] flex-col items-center font-[Pretendard]">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-center">
              서비스 약관 업데이트 안내
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[#999]">
              서비스 약관이 개정되어 <br />
              최신 약관 동의가 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel
              className="h-12 w-full rounded-lg bg-black text-white hover:bg-black/90 hover:text-white"
              onClick={onConfirm}
            >
              확인
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

TermsUpdateDialog.displayName = "TermsUpdateDialog";
