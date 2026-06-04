import { cn } from "@/exxonim/utils/cn";

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
}

/**
 * Floating WhatsApp button with pulse animation.
 * Fixed bottom-right, links to the configured WhatsApp number.
 */
export function WhatsAppButton({ phoneNumber, className }: WhatsAppButtonProps) {
  return (
    <a
      href={phoneNumber}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        // WhatsApp button target classes
        // Layout
        "fixed bottom-6 right-6 z-[30] inline-flex h-14 w-14 items-center justify-center",
        // Appearance
        "rounded-full border border-border-soft bg-accent text-accent-contrast",
        // Effects
        "transition-transform duration-150 ease-out hover:scale-110 hover:bg-accent-hover",
        className,
      )}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-accent/35 animate-whatsapp-pulse"
        aria-hidden="true"
      />

      {/* WhatsApp icon */}
      <svg
        className="relative z-10 w-[1.9rem] h-[1.9rem]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.01 2.014a9.96 9.96 0 0 0-8.52 15.11L2 22l4.985-1.465a9.961 9.961 0 1 0 5.025-18.52Zm0 18.067a8.093 8.093 0 0 1-4.14-1.134l-.297-.176-3.082.906.924-2.977-.193-.306A8.098 8.098 0 1 1 12.01 20.08Zm4.437-6.042c-.244-.122-1.439-.711-1.662-.793-.223-.081-.385-.122-.547.122-.162.244-.628.793-.77.955-.142.162-.284.183-.528.061-1.18-.56-2.072-1.1-2.884-2.522-.083-.146-.01-.223.111-.345.11-.11.244-.284.366-.427.122-.142.162-.244.244-.407.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.808-.198-.475-.399-.411-.547-.419-.142-.008-.305-.008-.468-.008-.162 0-.427.061-.65.305-.223.244-.852.833-.852 2.032s.873 2.358.995 2.522c.122.162 1.714 2.628 4.153 3.67.58.24 1.033.383 1.385.49.582.185 1.112.158 1.531.096.47-.07 1.439-.588 1.642-1.157.203-.569.203-1.056.142-1.157-.061-.101-.223-.162-.468-.284Z" />
      </svg>
    </a>
  );
}
