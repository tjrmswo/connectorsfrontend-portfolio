"use client";

export default function Home() {
  return (
    <div className="flex size-full flex-col">
      홈<main className="min-h-screen w-full">컨텐츠</main>
      <footer className="bg-[#fafafa] p-2 pb-[5rem]">
        <p className="w-full font-[Pretendard] text-[0.7rem] text-[#B8BEC2]">
          상호명: (주) 커넥팅로드 <br />
          대표: 김한홍 사업자등록번호: 641-88-03728 <br />
          주소: 경기도 안양시 동안구 시민대로327번길 11-41, 3층 648호 <br />
        </p>
      </footer>
    </div>
  );
}
