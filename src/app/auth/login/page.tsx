"use client";
import {
  AppleLoginButton,
  GoogleLoginButton,
  KakakoLoginButton,
  LoginHeader,
  useAnimatedToast,
} from "@/features/auth";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CommonToast } from "@/shared/ui";

export default function Login() {
  // const [showToast, setShowToast] = useState({
  //   comment: "d12351",
  //   status: 400,
  //   state: false,
  // });
  // const [shouldRender, setShouldRender] = useState<boolean>(false);

  const { toast, shouldRender, showToast, setToast } = useAnimatedToast(1500);
  const params = useSearchParams();

  return (
    <div className="flex h-full w-full flex-col items-center justify-around p-[5px]">
      <LoginHeader />
      <Image
        className="relative bottom-[1rem] w-3/5 object-contain"
        src={"/intro.png"}
        alt="스플래시 스크린"
        width={100}
        height={150}
      />

      <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-2">
        <KakakoLoginButton
          redirectPath={params.get("redirectPath")}
          setShowToast={setToast}
        />
        <GoogleLoginButton
          redirectPath={params.get("redirectPath")}
          setShowToast={setToast}
        />
        {/* 애플 로그인 */}
        <AppleLoginButton />
      </div>

      <button onClick={() => showToast("코멘트 메시지", 400)}>test</button>

      {/* <div
        className={`fixed top-[2rem] rounded-lg border border-[#f4f4f4] opacity-0 shadow-xl transition-all duration-1000 ease-in-out ${showToast.state ? "-translate-y-[5px] opacity-100" : "translate-y-[0px] opacity-0"}`}
      >
        <CommonToast
          content={showToast.comment}
          status={String(showToast.status)}
        />
      </div> */}
      {shouldRender && (
        <div
          className={`fixed top-[2rem] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
            toast.state
              ? "translate-y-[0px] opacity-100"
              : "-translate-y-[-20px] opacity-0"
          }`}
        >
          <CommonToast content={toast.comment} status={String(toast.status)} />
        </div>
      )}
      {/* {showToast.state && (
        <div className="fixed top-[2rem] -translate-y-[10px] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-1000 ease-in-out">
          <CommonToast
            content={showToast.comment}
            status={String(showToast.status)}
          />
        </div>
      )} */}
    </div>
  );
}
