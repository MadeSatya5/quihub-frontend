"use client";
// import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/list-soal/hooks/use-outside-click";
import { Reveal } from "./Reveal";
import Typography from "@/components/ui/Typography";
// import { useRouter } from "next/navigation";

export default function ExpandableCard({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  // const router = useRouter();
  const ref = useRef<HTMLDivElement>(null!);
  const id = useId();

  const filteredCourseList =
    selectedCategories.length > 0
      ? cards.filter((card) => selectedCategories.includes(card.category))
      : cards;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white-dark dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={700}
                  height={700}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div> */}

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 font-utendo"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 font-utendo"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-purple-soft hover:bg-purple-main text-white-soft font-utendo"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {filteredCourseList.map((card, index) => (
          <Reveal width="100%" delay={index * 0.35} key={index}>
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-row justify-between items-center bg-main-black hover:bg-neutral-800 rounded-xl cursor-pointer  mb-3"
            >
              <div className="flex gap-4 flex-row items-center">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Typography
                    variant="p"
                    weight="bold"
                    className="text-black text-center bg-main-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    {card.number}
                  </Typography>
                  {/* <Image
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className=" h-14 w-14 md:h-14 md:w-14 md:block rounded-xl object-cover object-top "
                  /> */}
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium font-utendo text-neutral-800 dark:text-neutral-200 text-left text-sm md:text-lg"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 font-utendo dark:text-neutral-400 text-left text-sm md:text-lg"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <motion.button
                // onClick={() => {
                //   router.push("/soal/");
                // }}
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold font-utendo bg-main-white text-black hover:text-white-soft mt-4 md:mt-0"
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Algoritma dasar, struktur, dan logika pemrograman",
    number: 1,
    title: "Dasar Pemrograman",
    ctaText: "Kerjakan",
    category: "Programming",
    ctaLink: "/materi/dasprog",
    content: () => {
      return (
        <p>
          Dasar Pemrograman adalah fondasi utama dalam dunia teknologi. Materi
          ini membahas konsep-konsep penting seperti algoritma dasar, struktur
          data, dan logika pemrograman yang diperlukan untuk mengembangkan
          keterampilan coding. Dengan memahami dasar pemrograman, Anda akan
          mampu menyelesaikan masalah dengan lebih terstruktur, membangun
          aplikasi sederhana, dan menyiapkan diri untuk belajar bahasa
          pemrograman yang lebih lanjut. Materi ini dirancang untuk pemula yang
          ingin memahami dasar-dasar logika dan pemikiran komputasional yang
          efisien.
        </p>
      );
    },
  },
  {
    number: 2,
    description: "Logika digital, dan rangkaian kombinasi serta sekuensial.",
    title: "Sistem Digital",
    ctaText: "Kerjakan",
    category: "Matematika",
    ctaLink: "/materi/sisdig",
    content: () => {
      return (
        <p>
          Sistem Digital adalah dasar dari teknologi modern yang kita gunakan
          sehari-hari. Materi ini mencakup konsep logika digital serta desain
          rangkaian kombinasi dan sekuensial yang membentuk sistem komputer dan
          perangkat elektronik lainnya. Dalam materi ini, Anda akan mempelajari
          cara kerja gerbang logika, tabel kebenaran, serta bagaimana rangkaian
          digital dikembangkan untuk memproses informasi secara efisien.
          Pemahaman ini penting bagi siapa saja yang ingin mendalami bidang
          elektronika atau ilmu komputer.
        </p>
      );
    },
  },
  {
    number: 3,
    description: "Analisis kebutuhan, desain, dan teori SDLC",
    title: "Pengembangan Perangkat Lunak",
    ctaText: "Kerjakan",
    category: "Konsep RPL",
    ctaLink: "/materi/ppl",
    content: () => {
      return (
        <p>
          Pengembangan Perangkat Lunak adalah proses penting dalam pembuatan
          aplikasi dan sistem. Materi ini mencakup analisis kebutuhan, desain
          perangkat lunak, serta teori SDLC (Software Development Life Cycle),
          yang membantu merancang perangkat lunak yang efektif dan sesuai dengan
          kebutuhan pengguna. Anda akan mempelajari cara menentukan kebutuhan
          pengguna, mendesain solusi, dan memahami berbagai tahap dalam SDLC,
          termasuk perencanaan, pengujian, dan pemeliharaan perangkat lunak.
          Pengetahuan ini sangat berguna bagi siapa saja yang tertarik dengan
          dunia rekayasa perangkat lunak.
        </p>
      );
    },
  },
];
