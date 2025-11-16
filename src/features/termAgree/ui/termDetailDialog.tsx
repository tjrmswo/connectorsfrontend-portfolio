import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared";

interface TermDetailDialogProps {
  term: {
    termsId: number;
    title: string;
    content: string;
  };
}

export default function TermDetailDialog({ term }: TermDetailDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="ml-auto cursor-pointer border-b-2 border-b-transparent px-2 text-[#B8BEC2] transition duration-300 hover:border-b-[#B8BEC2]">
        보기
      </AlertDialogTrigger>
      <AlertDialogContent className="font-[Pretendard]">
        <AlertDialogHeader>
          <AlertDialogTitle>{term.title}</AlertDialogTitle>
          <AlertDialogDescription>{term.content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
