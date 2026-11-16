import { trustBar } from "@/content/site";
import Icon from "./Icon";

export default function TrustBar() {
  return (
    <section aria-label="Destaques da conta" className="border-b border-line bg-white">
      <ul className="container-lg grid grid-cols-1 gap-x-6 gap-y-4 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:py-8">
        {trustBar.map((item) => (
          <li key={item.text} className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-offwhite text-brand">
              <Icon name={item.icon} size={22} />
            </span>
            <span className="text-[0.9375rem] font-semibold leading-snug text-navy">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
