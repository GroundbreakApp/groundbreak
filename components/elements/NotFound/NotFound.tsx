import NotFoundSVG from "../../../assets/no-data-found-21.svg";
import Image from 'next/image'

export const NotFound = () => {
  return <>
  <Image src={NotFoundSVG} alt="Not Found"/>
  </>
}