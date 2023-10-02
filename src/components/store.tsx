import { Open_Sans } from "next/font/google"
import { useEffect, useState } from "react"

const font = Open_Sans({
  subsets: ["latin"],
})

function LeftArrow() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25"
        stroke="#929292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Search() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9995 14.0003L10.5349 10.5356M10.5349 10.5356C11.4726 9.59789 11.9994 8.32608 11.9994 6.99994C11.9994 5.67381 11.4726 4.40199 10.5349 3.46428C9.59716 2.52656 8.32534 1.99976 6.99921 1.99976C5.67308 1.99976 4.40126 2.52656 3.46354 3.46428C2.52583 4.40199 1.99902 5.67381 1.99902 6.99994C1.99902 8.32608 2.52583 9.59789 3.46354 10.5356C4.40126 11.4733 5.67308 12.0001 6.99921 12.0001C8.32534 12.0001 9.59716 11.4733 10.5349 10.5356Z"
        stroke="#929292"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Ellipsis() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 6.1875C10.8177 6.1875 10.6428 6.11507 10.5139 5.98614C10.3849 5.8572 10.3125 5.68234 10.3125 5.5C10.3125 5.31766 10.3849 5.1428 10.5139 5.01386C10.6428 4.88493 10.8177 4.8125 11 4.8125C11.1823 4.8125 11.3572 4.88493 11.4861 5.01386C11.6151 5.1428 11.6875 5.31766 11.6875 5.5C11.6875 5.68234 11.6151 5.8572 11.4861 5.98614C11.3572 6.11507 11.1823 6.1875 11 6.1875ZM11 11.6875C10.8177 11.6875 10.6428 11.6151 10.5139 11.4861C10.3849 11.3572 10.3125 11.1823 10.3125 11C10.3125 10.8177 10.3849 10.6428 10.5139 10.5139C10.6428 10.3849 10.8177 10.3125 11 10.3125C11.1823 10.3125 11.3572 10.3849 11.4861 10.5139C11.6151 10.6428 11.6875 10.8177 11.6875 11C11.6875 11.1823 11.6151 11.3572 11.4861 11.4861C11.3572 11.6151 11.1823 11.6875 11 11.6875ZM11 17.1875C10.8177 17.1875 10.6428 17.1151 10.5139 16.9861C10.3849 16.8572 10.3125 16.6823 10.3125 16.5C10.3125 16.3177 10.3849 16.1428 10.5139 16.0139C10.6428 15.8849 10.8177 15.8125 11 15.8125C11.1823 15.8125 11.3572 15.8849 11.4861 16.0139C11.6151 16.1428 11.6875 16.3177 11.6875 16.5C11.6875 16.6823 11.6151 16.8572 11.4861 16.9861C11.3572 17.1151 11.1823 17.1875 11 17.1875Z"
        stroke="#929292"
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Reviews(props: {
  name: string
  stars: number
  date: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full flex items-center justify-center bg-[#01897B]">
          <p className="text-[12px]">{props.name.slice(0, 1)}</p>
        </div>

        <p className="text-white font-normal text-[10px]">{props.name}</p>
      </header>

      <div className="flex gap-2 items-center">
        <svg
          width="50"
          height="10"
          viewBox="0 0 50 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.43518 1.4416C5.27468 1.0556 4.72768 1.0556 4.56718 1.4416L3.65218 3.6421L1.27568 3.8326C0.859179 3.8661 0.690179 4.3861 1.00768 4.6581L2.81768 6.2091L2.26468 8.5276C2.16768 8.9341 2.61018 9.2556 2.96718 9.0376L5.00118 7.7951L7.03568 9.0376C7.39218 9.2556 7.83468 8.9341 7.73768 8.5276L7.18468 6.2091L8.99468 4.6581C9.31218 4.3861 9.14318 3.8661 8.72668 3.8331L6.35068 3.6421L5.43518 1.4416Z"
            fill="#A8C7FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4352 1.4416C15.2747 1.0556 14.7277 1.0556 14.5672 1.4416L13.6522 3.6421L11.2757 3.8326C10.8592 3.8661 10.6902 4.3861 11.0077 4.6581L12.8177 6.2091L12.2647 8.5276C12.1677 8.9341 12.6102 9.2556 12.9672 9.0376L15.0012 7.7951L17.0357 9.0376C17.3922 9.2556 17.8347 8.9341 17.7377 8.5276L17.1847 6.2091L18.9947 4.6581C19.3122 4.3861 19.1432 3.8661 18.7267 3.8331L16.3507 3.6421L15.4352 1.4416Z"
            fill="#A8C7FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.4352 1.4416C25.2747 1.0556 24.7277 1.0556 24.5672 1.4416L23.6522 3.6421L21.2757 3.8326C20.8592 3.8661 20.6902 4.3861 21.0077 4.6581L22.8177 6.2091L22.2647 8.5276C22.1677 8.9341 22.6102 9.2556 22.9672 9.0376L25.0012 7.7951L27.0357 9.0376C27.3922 9.2556 27.8347 8.9341 27.7377 8.5276L27.1847 6.2091L28.9947 4.6581C29.3122 4.3861 29.1432 3.8661 28.7267 3.8331L26.3507 3.6421L25.4352 1.4416Z"
            fill="#A8C7FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.4352 1.4416C35.2747 1.0556 34.7277 1.0556 34.5672 1.4416L33.6522 3.6421L31.2757 3.8326C30.8592 3.8661 30.6902 4.3861 31.0077 4.6581L32.8177 6.2091L32.2647 8.5276C32.1677 8.9341 32.6102 9.2556 32.9672 9.0376L35.0012 7.7951L37.0357 9.0376C37.3922 9.2556 37.8347 8.9341 37.7377 8.5276L37.1847 6.2091L38.9947 4.6581C39.3122 4.3861 39.1432 3.8661 38.7267 3.8331L36.3507 3.6421L35.4352 1.4416Z"
            fill="#A8C7FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45.4352 1.4416C45.2747 1.0556 44.7277 1.0556 44.5672 1.4416L43.6522 3.6421L41.2757 3.8326C40.8592 3.8661 40.6902 4.3861 41.0077 4.6581L42.8177 6.2091L42.2647 8.5276C42.1677 8.9341 42.6102 9.2556 42.9672 9.0376L45.0012 7.7951L47.0357 9.0376C47.3922 9.2556 47.8347 8.9341 47.7377 8.5276L47.1847 6.2091L48.9947 4.6581C49.3122 4.3861 49.1432 3.8661 48.7267 3.8331L46.3507 3.6421L45.4352 1.4416Z"
            fill="#A8C7FC"
          />
        </svg>

        <p className="font-normal text-[8px] text-[#848484]">{props.date}</p>
      </div>

      <p className="text-[#c2c2c2] text-[12px]">{props.description}</p>
    </div>
  )
}

export const Store = (props: {
  name: string
  store: string
  icon: string
  downloads: string
  size: string
  stars: number
  reviews: string
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

  const promptInstall = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
      }
    }
  }

  useEffect(() => {
    const callback = async (event: Event) => {
      setDeferredPrompt(event)
    }

    window.addEventListener("beforeinstallprompt", callback)

    return () => {
      window.removeEventListener("beforeinstallprompt", callback)
    }
  }, [])

  return (
    <div className="flex flex-col gap-[22px] px-3 py-5 bg-[#1F1F1F]">
      <header className="flex items-center justify-between">
        <LeftArrow />

        <div className="flex items-center gap-5">
          <Search />
          <Ellipsis />
        </div>
      </header>

      <section className="flex gap-5 px-2">
        <img src={props.icon} width={64} height={64} className="rounded-2xl" />

        <div className="flex flex-col gap-1.5">
          <h1 className="text-white font-semibold text-base">
            Serasa - Negocie suas Dívidas
          </h1>
          <p className="font-semibold text-[#C1CDE3] text-[10px]">Serasa App</p>
        </div>
      </section>

      <section className="flex justify-between px-5">
        <div className="flex flex-col gap-[5px] items-center">
          <div className="flex gap-0.5">
            <p className="font-semibold text-[#C3C3C3] text-[10px]">4.5</p>
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.10906 2.01858C7.88436 1.47818 7.11856 1.47818 6.89386 2.01858L5.61286 5.09928L2.28576 5.36598C1.70266 5.41288 1.46606 6.14088 1.91056 6.52168L4.44456 8.69308L3.67036 11.939C3.53456 12.5081 4.15406 12.9582 4.65386 12.653L7.50146 10.9135L10.3498 12.653C10.8489 12.9582 11.4684 12.5081 11.3326 11.939L10.5584 8.69308L13.0924 6.52168C13.5369 6.14088 13.3003 5.41288 12.7172 5.36668L9.39076 5.09928L8.10906 2.01858Z"
                fill="#C3C3C3"
              />
            </svg>
          </div>

          <p className="text-[#6F6F6F] font-normal text-[10px]">989K reviews</p>
        </div>

        <div className="h-[20px] w-[1px] bg-[#5F5F5F]" />

        <div className="flex flex-col gap-[5px] items-center">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33301 13.7502V15.6252C3.33301 16.1225 3.53055 16.5994 3.88218 16.9511C4.23381 17.3027 4.71073 17.5002 5.20801 17.5002H16.458C16.9553 17.5002 17.4322 17.3027 17.7838 16.9511C18.1355 16.5994 18.333 16.1225 18.333 15.6252V13.7502M14.583 10.0002L10.833 13.7502M10.833 13.7502L7.08301 10.0002M10.833 13.7502V2.50024"
              stroke="#CACACA"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-[#6F6F6F] font-normal text-[10px]">122 MB</p>
        </div>

        <div className="h-[20px] w-[1px] bg-[#5F5F5F]" />

        <div className="flex flex-col gap-[5px] items-center">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.666992" width="18" height="18" rx="1" fill="#03A14C" />
            <path
              d="M7.09277 13.3838V4.81738H9.40723V11.5146H12.7061V13.3838H7.09277Z"
              fill="white"
            />
          </svg>

          <p className="text-[#6F6F6F] font-normal text-[10px]">Livre</p>
        </div>

        <div className="h-[20px] w-[1px] bg-[#5F5F5F]" />

        <div className="flex flex-col gap-[5px] items-center">
          <p className="text-[#C7C7C7] font-bold text-[10px]">1M+</p>

          <p className="text-[#6F6F6F] font-normal text-[10px]">Downloads</p>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <button
          onClick={promptInstall}
          className="font-semibold text-[10px] py-3 w-full rounded-full bg-[#A8C8FB] text-[#0A1F3E]"
        >
          Instalar
        </button>

        <ul className="w-full gap-3 flex items-center h-[144px]">
          <li className="w-[80px] h-full">
            <img src="/serasa/cover_1.png" alt="" />
          </li>

          <li className="w-[80px] h-full">
            <img src="/serasa/cover_2.png" alt="" />
          </li>

          <li className="w-[80px] h-full">
            <img src="/serasa/cover_3.png" alt="" />
          </li>

          <li className="w-[80px] h-full">
            <img src="/serasa/cover_4.png" alt="" />
          </li>
        </ul>
      </div>

      <section className="px-2.5 flex flex-col gap-4">
        <header className="flex justify-between items-center w-full">
          <p className="font-semibold text-white text-xs">Sobre esse app</p>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 10H16.25M16.25 10L10.625 15.625M16.25 10L10.625 4.375"
              stroke="#929292"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </header>

        <p className="text-[12px] font-normal text-[#7E7E7E]">
          Quite suas dívidas com até 99% de desconto com o feirão serasa!
        </p>
      </section>

      <section className="flex items-center gap-2 px-2.5">
        <div className="border border-[#727274] py-1.5 px-2 shrink-0 rounded text-[#727274] font-semibold text-[10px]">
          #1 Quitação de Dívidas
        </div>
      </section>

      <section className="px-2.5 flex gap-4 flex-col">
        <header className="flex items-center justify-between">
          <p>Ratigns and reviews</p>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 10H16.25M16.25 10L10.625 15.625M16.25 10L10.625 4.375"
              stroke="#929292"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </header>

        <div className="flex gap-5 w-full">
          <p className="font-semibold text-4xl text-white">4.9</p>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full gap-2 flex items-center">
              <p className="font-semibold text-white">5</p>

              <div className="flex h-3 w-full items-center justify-start overflow-hidden rounded-full bg-white/10">
                <span
                  className={`w-[90%] bg-[#A8C8FA] h-3 rounded-full`}
                ></span>
              </div>
            </div>

            <div className="w-full gap-2 flex items-center">
              <p className="font-semibold text-white">4</p>

              <div className="flex h-3 w-full items-center justify-start overflow-hidden rounded-full bg-white/10">
                <span className={`w-[4%] bg-[#A8C8FA] h-3 rounded-full`}></span>
              </div>
            </div>

            <div className="w-full gap-2 flex items-center">
              <p className="font-semibold text-white">3</p>

              <div className="flex h-3 w-full items-center justify-start overflow-hidden rounded-full bg-white/10">
                <span className={`w-[2%] bg-[#A8C8FA] h-3 rounded-full`}></span>
              </div>
            </div>

            <div className="w-full gap-2 flex items-center">
              <p className="font-semibold text-white">2</p>

              <div className="flex h-3 w-full items-center justify-start overflow-hidden rounded-full bg-white/10">
                <span className={`w-[2%] bg-[#A8C8FA] h-3 rounded-full`}></span>
              </div>
            </div>

            <div className="w-full gap-2 flex items-center">
              <p className="font-semibold text-white">1</p>

              <div className="flex h-3 w-full items-center justify-start overflow-hidden rounded-full bg-white/10">
                <span className={`w-[2%] bg-[#A8C8FA] h-3 rounded-full`}></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <svg
            width="50"
            height="10"
            viewBox="0 0 50 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.43518 1.4416C5.27468 1.0556 4.72768 1.0556 4.56718 1.4416L3.65218 3.6421L1.27568 3.8326C0.859179 3.8661 0.690179 4.3861 1.00768 4.6581L2.81768 6.2091L2.26468 8.5276C2.16768 8.9341 2.61018 9.2556 2.96718 9.0376L5.00118 7.7951L7.03568 9.0376C7.39218 9.2556 7.83468 8.9341 7.73768 8.5276L7.18468 6.2091L8.99468 4.6581C9.31218 4.3861 9.14318 3.8661 8.72668 3.8331L6.35068 3.6421L5.43518 1.4416Z"
              fill="#A8C7FC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.4352 1.4416C15.2747 1.0556 14.7277 1.0556 14.5672 1.4416L13.6522 3.6421L11.2757 3.8326C10.8592 3.8661 10.6902 4.3861 11.0077 4.6581L12.8177 6.2091L12.2647 8.5276C12.1677 8.9341 12.6102 9.2556 12.9672 9.0376L15.0012 7.7951L17.0357 9.0376C17.3922 9.2556 17.8347 8.9341 17.7377 8.5276L17.1847 6.2091L18.9947 4.6581C19.3122 4.3861 19.1432 3.8661 18.7267 3.8331L16.3507 3.6421L15.4352 1.4416Z"
              fill="#A8C7FC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.4352 1.4416C25.2747 1.0556 24.7277 1.0556 24.5672 1.4416L23.6522 3.6421L21.2757 3.8326C20.8592 3.8661 20.6902 4.3861 21.0077 4.6581L22.8177 6.2091L22.2647 8.5276C22.1677 8.9341 22.6102 9.2556 22.9672 9.0376L25.0012 7.7951L27.0357 9.0376C27.3922 9.2556 27.8347 8.9341 27.7377 8.5276L27.1847 6.2091L28.9947 4.6581C29.3122 4.3861 29.1432 3.8661 28.7267 3.8331L26.3507 3.6421L25.4352 1.4416Z"
              fill="#A8C7FC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.4352 1.4416C35.2747 1.0556 34.7277 1.0556 34.5672 1.4416L33.6522 3.6421L31.2757 3.8326C30.8592 3.8661 30.6902 4.3861 31.0077 4.6581L32.8177 6.2091L32.2647 8.5276C32.1677 8.9341 32.6102 9.2556 32.9672 9.0376L35.0012 7.7951L37.0357 9.0376C37.3922 9.2556 37.8347 8.9341 37.7377 8.5276L37.1847 6.2091L38.9947 4.6581C39.3122 4.3861 39.1432 3.8661 38.7267 3.8331L36.3507 3.6421L35.4352 1.4416Z"
              fill="#A8C7FC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.4352 1.4416C45.2747 1.0556 44.7277 1.0556 44.5672 1.4416L43.6522 3.6421L41.2757 3.8326C40.8592 3.8661 40.6902 4.3861 41.0077 4.6581L42.8177 6.2091L42.2647 8.5276C42.1677 8.9341 42.6102 9.2556 42.9672 9.0376L45.0012 7.7951L47.0357 9.0376C47.3922 9.2556 47.8347 8.9341 47.7377 8.5276L47.1847 6.2091L48.9947 4.6581C49.3122 4.3861 49.1432 3.8661 48.7267 3.8331L46.3507 3.6421L45.4352 1.4416Z"
              fill="#A8C7FC"
            />
          </svg>

          <p className="text-[#848484] font-normal text-[10px]">143,942</p>
        </div>

        <Reviews
          name="Roberto Augusto"
          date="9/3/23"
          description="Muito bom o app"
          stars={5}
        />

        <Reviews
          name="Janaína Souza"
          date="12/7/23"
          description="Consegui pagar todas as minhas dívidas com 90% de desconto, tô em choque até agora."
          stars={5}
        />
      </section>
    </div>
  )
}
