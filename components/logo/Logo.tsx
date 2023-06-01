import LogoSVG from "@/assets/groundbreak.svg";
import logoUrl from "@/assets/groundbreak.png";
import Image from "next/image";
import { useRouter } from "next/router";
export const Logo = () => {
  const router = useRouter();
  return (<>
    <div className="w-[189px] h-[23px] flex items-center absolute left-0 right-0 bottom-4 p-1 justify-center ml-auto mr-auto sm:ml-0 z-[9999] pointer-events-auto cursor-pointer"
      onClick={() => router.push("/pmf")}
    >
      <Image width="189" height="23" src={logoUrl} alt="groundbreak app" />
    </div>
  </>)
}