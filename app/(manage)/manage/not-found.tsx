import Link from "next/link";

export default function NotFound() {
  return (
    <div className={"text-center pt-3"}>
      <i className={"uil-exclamation-triangle color-title"} style={{fontSize: "4rem"}}></i>
      <h2>Page Not Found</h2>
      <p className={"mb-1"}>Could not find requested resource</p>
      <Link href="/manage/dashboard">
        <i className={"uil-arrow-left mr-0-5"}></i>Return Dashboard
      </Link>
    </div>
  )
}
