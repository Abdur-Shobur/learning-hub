import { HomeHub } from "@/components/home-hub";
import { courses } from "@/content/catalog";

export default function Home() {
  return <HomeHub courses={courses} />;
}
