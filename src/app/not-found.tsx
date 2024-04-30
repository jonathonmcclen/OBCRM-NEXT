import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import "./index.css";
import SifiCard from "@/components/SifiCard";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      {/*----------SECTION 1----------*/}
      <div className="crt section mt-0 flex h-screen max-h-[90vh] w-full flex-row place-items-center gap-12 overflow-hidden md:gap-0">
        <div className="flex w-2/3 flex-col place-items-end md:w-1/2">
          <h1 className="mb-2 text-3xl font-thin uppercase tracking-widest md:text-5xl lg:text-7xl">
            NO RECORD FOUND <br />
          </h1>
          <div className="w-full border-2 border-b-black border-l-black border-r-[#FFD1B2] border-t-[#FFD1B2] px-6 py-4 text-right after:absolute after:left-0 after:-z-10 after:mt-[-51px] after:h-[70px] after:w-2/3 after:border-4 after:border-b-black after:border-l-black after:border-r-[#FFD1B2] after:border-t-[#FFD1B2] after:blur-sm md:after:w-1/2">
            <Link href="/login-signup">
              <p className="cursor-pointer pt-2 font-black uppercase tracking-wide underline underline-offset-8 transition-all  duration-300 hover:underline-offset-[12px] hover:drop-shadow-[0_4px_21px_rgba(255,235,205,1)]">
                head back home
              </p>
            </Link>
          </div>
        </div>

        <img
          className="-mr-[420px] inline-block h-[50vh] rotate-180 md:h-[70vh] md:rotate-0"
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/dsadsdsfssdsd%201%20(2).png"
        />
      </div>
    </>
  );
}

// // Set the scroll amount for each "chunk"
// const CHUNK_SIZE = 12; // pixels

// // Throttle the scroll event to prevent performance issues
// let isScrolling = false;
// let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// window.addEventListener('scroll', () => {
//   if (!isScrolling) {
//     isScrolling = true;

//     // Timeout to throttle the scroll event
//     setTimeout(() => {
//       // Determine the direction of the scroll
//       const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
//       const scrollDown = currentScroll > lastScrollTop;

//       // Calculate the next scroll position
//       let nextScroll;
//       if (scrollDown) {
//         nextScroll = Math.ceil(currentScroll / CHUNK_SIZE) * CHUNK_SIZE;
//       } else {
//         nextScroll = Math.floor(currentScroll / CHUNK_SIZE) * CHUNK_SIZE;
//       }

//       // Scroll to the next chunk
//       window.scrollTo({
//         top: nextScroll,
//         behavior: 'instant'
//       });

//       // Update last scroll position
//       lastScrollTop = nextScroll;
//       isScrolling = false;
//     }, 12);
//   } else {
//     // Prevent default scrolling behavior while we are adjusting the scroll position
//     event.preventDefault();
//   }
// }, { passive: false });
