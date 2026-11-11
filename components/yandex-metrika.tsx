"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const validId = counterId && /^\d+$/.test(counterId);

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

function PageViews({ id }: { id: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!window.ym) return;
    const query = searchParams.toString();
    const url = pathname + (query ? "?" + query : "");
    window.ym(id, "hit", url);
  }, [id, pathname, searchParams]);
  return null;
}

export function YandexMetrika() {
  if (!validId) return null;
  const id = Number(counterId);
  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=${id}","ym");ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false,defer:true});`
        }}
      />
      <Suspense fallback={null}><PageViews id={id} /></Suspense>
    </>
  );
}
